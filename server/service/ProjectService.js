const { UserProject, Document, ProjectDocument } = require("../models/models");
const ApiError = require("../error/ApiError");
const sequelize = require("../db");

class ProjectService {
  async addProject(userId, name) {
    try {
      const userProject = await UserProject.create({
        name: name,
        user_id: userId,
      });

      return { label: userProject.name, value: userProject["project_id"] };
    } catch (e) {
      console.log(e);
      throw ApiError.badRequest("Проект с таким именем уже существует");
    }
  }

  async addDocument(projectId, elasticId, docName) {
    const project = await UserProject.findOne({
      where: {
        project_id: projectId,
      },
    });

    if (!project) {
      throw ApiError.badRequest("Проекта не существует");
    }

    const document = await Document.findOrCreate({
      where: {
        elastic_id: elasticId,
        doc_name: docName,
      },
    });

    let isAdded = await document[0].addUserProject(project, {
      through: ProjectDocument,
    });

    return isAdded;
  }

  async getAllProjectsName(userId) {
    const projects = await UserProject.findAll({
      where: {
        user_id: userId,
      },
      attributes: [
        ["name", "label"],
        ["project_id", "value"],
      ],
    });

    return projects;
  }

  async getProjects(userId) {
    const [results] = await sequelize.query(
      "SELECT user_project.project_id, name, COUNT(document_id) \n" +
        "FROM user_project \n" +
        "INNER JOIN user_account ON user_account.user_id = user_project.user_id\n" +
        "LEFT JOIN project_document ON user_project.project_id = project_document.project_id\n" +
        "GROUP BY user_project.project_id, user_account.user_id\n" +
        `having user_account.user_id = ${userId}`
    );

    return results;
  }

  async getDocumentsInProject(projectId) {
    let project = await UserProject.findAll({
      where: {
        project_id: projectId,
      },
      attributes: [],

      include: {
        model: Document,
        attributes: ["elastic_id", "document_id", "doc_name", "createdAt"],
        through: {
          attributes: [],
        },
      },

      order: [[Document, "createdAt", "desc"]],
    });

    return project[0].Documents;
  }

  async deleteDocument(projectId, docId) {
    let deleted = await ProjectDocument.destroy({
      where: {
        project_id: projectId,
        document_id: docId,
      },
    });
    return deleted;
  }

  async deleteProject(projectId) {
    let deleted = await UserProject.destroy({
      where: {
        project_id: projectId,
      },
    });
    return deleted;
  }
}

module.exports = new ProjectService();
