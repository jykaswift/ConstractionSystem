import $api from "../http/axios";

export default class UserService {
  static async getData(userId) {
    return $api.get(`/api/user/data/${userId}`);
  }

  static async changeData(data) {
    return $api.patch(`/api/user/data`, data);
  }

  static async changePassword(data) {
    return $api.patch(`/api/user/password`, data);
  }


}