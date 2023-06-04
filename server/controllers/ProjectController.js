const projectService = require("../service/ProjectService");


class ProjectController {
  async addProject(req, res, next) {
    try {
      const { userId, name } = req.body;
      let added = await projectService.addProject(userId, name);
      return res.status(200).json(added);
    } catch (e) {
      next(e);
    }
  }

  async addDocument(req, res, next) {
    try {
      const { projectId, elasticId, docName } = req.body;
      await projectService.addDocument(projectId, elasticId, docName);
      return res.status(200).json();
    } catch (e) {
      console.log(e)
      next(e);
    }
  }

  async getAllProjectsName(req, res, next) {
    try {
      const userId = req.params.userId;

      const projects = await projectService.getAllProjectsName(userId);
      return res.status(200).json(projects);
    } catch (e) {
      next(e);
    }
  }

  async getProjectsOrDocuments(req, res, next) {
    try {
      const { userId, projectId } = req.query;

      let projects = [];

      if (userId) {
        projects = await projectService.getProjects(userId);
      } else if (projectId) {
        projects = await projectService.getDocumentsInProject(projectId);
      }

      return res.json(projects);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async deleteDocument(req, res, next) {
    try {
      const projectId = req.params.projectId;
      const docId = req.params.docId;

      let deleted = await projectService.deleteDocument(projectId, docId);

      return res.json(deleted);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async deleteProject(req, res, next) {
    try {
      const projectId = req.params.projectId;

      let deleted = await projectService.deleteProject(projectId);

      return res.json(deleted);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }


}

module.exports = new ProjectController();
