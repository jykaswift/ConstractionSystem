const userService = require("../service/UserService");
const ApiError = require("../error/ApiError");
const { validationResult } = require("express-validator");

class UserController {
  async getData(req, res, next) {
    try {
      const userId = req.params.id;

      if (userId === "undefined") {
        next(ApiError.badRequest("Id не передан"));
      }

      const userData = await userService.getData(userId);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async changeData(req, res, next) {
    try {
      const { id, name, lastname, patronymic, phone } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.badRequest("Ошибка при валидации", errors.array())
        );
      }

      const changedData = await userService.changeData(
        id,
        name,
        lastname,
        patronymic,
        phone
      );

      return res.json(changedData);
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { id, password, newPassword } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.badRequest("Ошибка при валидации", errors.array())
        );
      }

      const result = await userService.changePassword(
        password,
        newPassword,
        id
      );

      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
