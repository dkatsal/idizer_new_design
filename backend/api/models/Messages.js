/**
 * Messages.js
 *
 * @description :: Token model
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
  attributes: {
    userId: {
      type: Sequelize.UUID,
    },
    fromName: {
      type: Sequelize.STRING(100),
    },
    fromEmail: {
      type: Sequelize.STRING(100),
    },
    fromAvatar: {
      type: Sequelize.STRING(100),
    },
    toName: {
      type: Sequelize.STRING(100),
    },
    toEmail: {
      type: Sequelize.STRING(100),
    },
    subject: {
      type: Sequelize.STRING(100),
    },
    text: {
      type: Sequelize.STRING(100),
    },
    time: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  associations: function () {},
  options: {
    freezeTableName: false,
    tableName: "messages",
    classMethods: {},
    instanceMethods: {},
    hooks: {},
  },
};
