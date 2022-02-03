/**
 * TokenService.js
 *
 */
const crypto = require('crypto');

module.exports = {
  generateToken: async (user, role, deviceId, deviceMeta = null) => {
    const currentToken = await Token.findOne({
      where: { userId: user.id, role },
    });
    const otherTokens = await Token.findAll({
      where: {
        userId: user.id,
        role,
      },
      order: [['updatedAt', 'DESC']],
    });

    if (
      Object.keys(otherTokens).length === sails.config.custom.tokenLimit[role]
    ) {
      await Token.destroy({ where: { id: otherTokens[0].id } });
    }

    if (currentToken && currentToken.id) {
      const result = await Token.update(
        { value: crypto.randomBytes(32).toString('hex') },
        {
          where: {
            id: currentToken.id,
          },
          returning: true,
        }
      );

      const { value } = result ? result[1][0].get() : null;
      return value;
    } else {
      const { value } = await Token.create({
        userId: user.id,
        value: crypto.randomBytes(32).toString('hex'),
        role: role,
        socketToken: user.socketToken,
        deviceId: deviceId,
        deviceMeta: deviceMeta,
      });

      return value;
    }
  },

  validateToken: async function (token, role, deviceId) {
    const tokenData = await Token.findOne({
      where: { value: token, role, deviceId },
    });
    return tokenData ? tokenData.userId : null;
  },

  updateSocketToken: async function (
    userId,
    role,
    value,
    socketToken,
    deviceId,
    deviceMeta = null
  ) {
    return await Token.update(
      { socketToken },
      { where: { userId, role, value, deviceId, deviceMeta } }
    );
  },
};
