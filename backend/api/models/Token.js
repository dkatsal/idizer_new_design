const crypto = require('crypto');

/**
 * Token.js
 *
 * @description :: Token model
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
  attributes: {
    userId: {
      type: Sequelize.UUID,
    },
    value: {
      type: Sequelize.STRING(64),
    },
    role: {
      type: Sequelize.STRING(10),
    },
    socketToken: {
      type: Sequelize.STRING(200)
    },
    deviceId: {
      type: Sequelize.STRING(50)
    },
    deviceMeta: {
      type: Sequelize.JSON
    },
  },
  associations: function () {
  },
  options: {
    freezeTableName: false,
    tableName: 'token',
    classMethods: {},
    instanceMethods: {},
    hooks: {},
  }
};

