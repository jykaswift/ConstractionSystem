import $api from "../http/axios";

export default class AuthService {
  static async login(email, password) {
    return $api.post("/api/user/login", { email, password });
  }

  static async registration(name, email, password) {
    return $api.post("/api/user/registration", { name, email, password: password });
  }

  static async google(authData) {
    return $api.post("/api/user/google", { ...authData });
  }

  static async recover(email) {
    return $api.post("/api/user/recover", email);
  }


  static async logout() {
    return $api.post("/api/user/logout");
  }

  static async edit(id, name, lastname, patronymic, phone) {
    return $api.post("/api/user/edit", {
      id,
      name,
      lastname,
      patronymic,
      phone,
    });
  }
}