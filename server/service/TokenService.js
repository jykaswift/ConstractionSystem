const jwt = require("jsonwebtoken");
const { UserToken } = require("../models/models");
const { OAuth2Client } = require('google-auth-library')
class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }


  generateActivateToken(payload) {
    return jwt.sign(payload, process.env.JWT_ACTIVATE_KEY, {
      expiresIn: "24h",
    });
  }

  validateActiveToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACTIVATE_KEY);
    } catch (e) {
      return null;
    }
  }

  async validateGoogleToken(token) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      return ticket.getPayload()
    } catch (e) {
      return null;
    }
  }


  validateAccessToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_KEY);
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_KEY);
    } catch (e) {
      return null;
    }
  }

  async removeToken(refreshToken) {
    const deleteTokenData = await UserToken.destroy({
      where: {
        refresh_token: refreshToken,
      },
    });
    return deleteTokenData
  }

  async findToken(refreshToken) {
    const tokenData = await UserToken.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    return tokenData
  }

  async saveToken(userId, refreshToken) {
    const userWithToken = await UserToken.findOne({
      where: {
        user_id: userId,
      },
    });

    if (userWithToken) {
      userWithToken.refresh_token = refreshToken;
      return userWithToken.save();
    }

    return await UserToken.create({
      user_id: userId,
      refresh_token: refreshToken,
    });
  }
}

module.exports = new TokenService();
