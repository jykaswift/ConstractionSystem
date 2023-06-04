const {
  UserAccount,
  UserLoginInfo,
  GoogleLoginInfo,
} = require("../models/models");
const bcrypt = require("bcrypt");
const tokenService = require("./TokenService");
const mailService = require("./MailService");
const UserDto = require("../dtos/UserDto");
const ApiError = require("../error/ApiError");
const crypto = require("crypto-js");
const RegisterDto = require("../dtos/RegisterDto");
const axios = require("axios");

class AuthService {
  async registration(email, password, name) {
    const applicant = await UserLoginInfo.findOne({ where: { email: email } });

    if (applicant) {
      throw ApiError.badRequest(
        "Пользователь с таким email адресом уже существует"
      );
    }

    let encryptedPassword = crypto.AES.encrypt(
      password,
      process.env.CRYPTO_KEY
    ).toString();

    let registerDto = new RegisterDto(email, encryptedPassword, name);

    const activateToken = tokenService.generateActivateToken({
      ...registerDto,
    });
    mailService.sendActivationLetter(
      registerDto.email,
      `${process.env.API_URL}/api/user/activate/${activateToken}`
    );
    return {
      user: { email: email, name: name },
    };
  }

  async login(email, password) {
    const user = await UserLoginInfo.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw ApiError.badRequest("Неверная почта или пароль");
    }

    const userAccount = await UserAccount.findOne({
      where: {
        user_id: user.user_id,
      },
    });

    const checkPassword = await bcrypt.compare(password, user.password_hash);
    if (!checkPassword) {
      throw ApiError.badRequest("Неверная почта или пароль");
    }

    const userDto = new UserDto(user, userAccount);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.user_id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(token) {
    const userData = tokenService.validateActiveToken(token);

    if (!userData) {
      return {};
    }

    const isAlreadyExist = await UserLoginInfo.findOne({
      where: {
        email: userData.email,
      },
    });

    if (isAlreadyExist) {
      return {};
    }

    let decryptedPassword = crypto.AES.decrypt(
      userData.enc,
      process.env.CRYPTO_KEY
    ).toString(crypto.enc.Utf8);

    const hashPassword = await bcrypt.hash(decryptedPassword, 5);

    const userAccount = await UserAccount.create({ firstname: userData.name });
    const userLoginInfo = await UserLoginInfo.create({
      email: userData.email,
      password_hash: hashPassword,
      user_id: userAccount.user_id,
    });

    const userDto = new UserDto(userLoginInfo, userAccount);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userAccount.user_id, tokens.refreshToken);

    return tokens;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const isValid = tokenService.validateRefreshToken(refreshToken);
    const token = await tokenService.findToken(refreshToken);

    if (!isValid || !token) {
      throw ApiError.UnauthorizedError();
    }

    let user = await UserLoginInfo.findOne({
      where: {
        user_id: token.user_id,
      },
    });

    // Для гугл авторизации
    if (!user) {
      user = await GoogleLoginInfo.findOne({
        where: {
          user_id: token.user_id,
        },
      });
    }

    const userAccount = await UserAccount.findOne({
      where: {
        user_id: user.user_id,
      },
    });


    const userDto = new UserDto(user, userAccount);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.user_id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async edit(id, name, lastname, patronymic, phone) {
    const userAccount = await UserAccount.findOne({
      where: {
        user_id: id,
      },
    });

    if (!userAccount) {
      throw ApiError.badRequest("Пользователь несуществует");
    }

    userAccount.firstname = name;
    userAccount.lastname = lastname;
    userAccount.patronymic = patronymic;
    userAccount.phone = phone;

    userAccount.save();

    return {
      name,
      lastname,
      patronymic,
    };
  }

  async google(tokenId) {
    const userData = await axios
      .get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenId['access_token']}` },
      })
      .then(res => res.data);

    let userLoginInfo = await GoogleLoginInfo.findOne({
      where: {
        email: userData.email,
      },
    });

    let userAccount;

    if (!userLoginInfo) {
      userAccount = await UserAccount.create({
        firstname: userData["given_name"],
      });
      userLoginInfo = await GoogleLoginInfo.create({
        email: userData.email,
        user_id: userAccount.user_id,
      });
    } else {
      userAccount = await UserAccount.findOne({
        where: {
          user_id: userLoginInfo.user_id,
        },
      });
    }

    const userDto = new UserDto(userLoginInfo, userAccount);

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userAccount.user_id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async recover(email) {
    const userData = await UserLoginInfo.findOne({
      where: {
        email: email
      }
    })

    if (!userData) {
      throw ApiError.badRequest("Такая почта не зарегистрирована");
    }
    let randomString = Math.random().toString(36).slice(-8);
    const hashPassword = await bcrypt.hash(randomString, 5);
    userData['password_hash'] = hashPassword
    userData.save()
    mailService.sendNewPassword(email, randomString)


  }
}

module.exports = new AuthService();
