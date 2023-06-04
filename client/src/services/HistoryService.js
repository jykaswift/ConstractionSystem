import $api from "../http/axios";

export default class HistoryService {
  static async addHistory(data) {
    return $api.post(`/api/user/history`, data);
  }

  static async getHistory(id, page) {
    return $api.get(`/api/user/history/?id=${id}&page=${page}&limit=10`);
  }

  static async deleteAllHistory(id) {
    return $api.delete(`/api/user/history/${id}`);
  }

  static async deleteCertainHistory(userId, historyId) {
    return $api.delete(`/api/user/history/${userId}/${historyId}`);
  }

}