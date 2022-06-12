const jwt = require('jsonwebtoken');
const { tokens } = require('../../.serverrc');
const { Tokens, Users } = require('../../db/models');

module.exports = class TokenService {
  static generateAccessToken(payload) {
    return jwt.sign(payload, tokens.access.secret, tokens.access.options);
  }

  static generateRefreshToken(payload) {
    return jwt.sign(payload, tokens.refresh.secret, tokens.refresh.options);
  }

  static validateToken(token, type = 'refresh') {
    try {
      return jwt.verify(token, tokens[type].secret);
    } catch (e) {
      return null;
    }
  }

  static async saveToken(user_id, refreshToken) {
    const [tokenData, isNew] = await Tokens.findOrCreate({
      defaults: { user_id, refreshToken },
      where: { user_id },
    });

    if (!isNew) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
    }

    return tokenData;
  }

  static removeToken = async (refreshToken) => refreshToken ? 
    await Tokens.destroy({ where: { refreshToken } }) : null

  static findTokenWithUser = async (refreshToken) =>
    await Tokens.findOne({
      where: { refreshToken },
      include: {
        model: Users,
        required: true,
        attributes: ['id', 'email', 'role'],
      },
    });
};
