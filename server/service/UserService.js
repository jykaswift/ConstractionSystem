const {
  UserAccount,
  UserLoginInfo,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");

class UserService {
  async getData(userId) {
    const userData = await UserAccount.findOne({
      where: {
        user_id: userId,
      },
    });

    if (!userData) {
      throw ApiError.badRequest("Пользователь не найден");
    }

    return {
      name: userData.firstname,
      lastname: userData.lastname,
      patronymic: userData.patronymic,
      phone: userData.phone,
    };
  }

  async changeData(id, name, lastname, patronymic, phone) {
    await UserAccount.update(
      {
        firstname: name,
        lastname: lastname,
        patronymic: patronymic,
        phone: phone,
      },
      {
        where: { user_id: id },
      }
    );
    return { message: "Данные успешно сохранены" };
  }

  async changePassword(password, newPassword, id) {
    const user = await UserLoginInfo.findOne({
      where: {
        user_id: id,
      },
    });

    if (!user) {
      throw ApiError.badRequest("Пользователь не найден");
    }

    const checkPassword = await bcrypt.compare(password, user.password_hash);

    if (!checkPassword) {
      throw ApiError.badRequest("Неверный текущий пароль");
    }

    user.password_hash = await bcrypt.hash(newPassword, 5);
    user.save();

    return { message: "Пароль успешно изменен" };
  }

}

module.exports = new UserService();
