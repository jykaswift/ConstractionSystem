import $api from "../http/axios";

export default class FavoriteService {
  static async addFavorite(userId, elasticId, title) {
    return $api.post(`/api/user/favorite`, {
      id: userId,
      elasticId: elasticId,
      name: title,
    });
  }

  static async isFavorite(userId, docId) {
    return $api.get(`/api/user/favorite/${userId}/${docId}`);
  }

  static async deleteFavorite(userId, docId) {
    return $api.delete(`/api/user/favorite/${userId}/${docId}`);
  }

  static async deleteAllFavorite(userId) {
    return $api.delete(`/api/user/favorite/${userId}`);
  }

  static async getFavorite(id, page) {
    return $api.get(`/api/user/favorite/?id=${id}&page=${page}&limit=10`);
  }
}