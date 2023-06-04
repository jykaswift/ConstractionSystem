const authService = require("../service/AuthService");
const { validationResult } = require("express-validator");
const ApiError = require("../error/ApiError");

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.badRequest("Ошибка при валидации", errors.array())
        );
      }
      const { email, password, name } = req.body;
      const userData = await authService.registration(email, password, name);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async google(req, res, next) {
    try {
      const userToken = req.body
      const userData = await authService.google(userToken);

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);

    } catch (e) {
      console.log(e)
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const userData = await authService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const result = await authService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const result = await authService.refresh(refreshToken);
      res.cookie("refreshToken", result.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(result);
    } catch (e) {
      console.log(e)
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const token = req.params.link;
      const tokens = await authService.activate(token);
      if (Object.keys(tokens).length !== 0) {
        res.cookie("refreshToken", tokens.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        });
        return res.redirect(`${process.env.CLIENT_DOMAIN}/successConfirm`);
      } else {
        return res.redirect(`${process.env.CLIENT_DOMAIN}/errorConfirm`);
      }
    } catch (e) {
      console.log(e)
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      const { id, name, lastname, patronymic, phone } = req.body;

      const userData = await authService.edit(
        id,
        name,
        lastname,
        patronymic,
        phone
      );
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async recover(req, res, next) {
    try {
      const { email } = req.body;
      await authService.recover(email);
      return res.status(200).json();
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();
