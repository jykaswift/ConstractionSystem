import $api from "../http/axios";

export default class ProjectService {
  static async getProjectsNames(userId) {
    return $api.get(`/api/user/project/${userId}`);
  }

  static async createProject(userId, name) {
    return $api.post(`/api/user/project`, {
      userId: userId,
      name: name,
    });
  }

  static async addDocument(projectId, elasticId, docName) {
    return $api.patch(`/api/user/project`, {
      projectId: projectId,
      elasticId: elasticId,
      docName: docName,
    });
  }

  static async getProjects(userId) {
    return $api.get(`/api/user/project/?userId=${userId}`);
  }

  static async getDocuments(projectId) {
    return $api.get(`/api/user/project/?projectId=${projectId}`);
  }

  static async deleteDocuments(projectId, docId) {
    return $api.delete(`/api/user/project/${projectId}/${docId}`);
  }

  static async deleteProject(projectId) {
    return $api.delete(`/api/user/project/${projectId}`);
  }
}