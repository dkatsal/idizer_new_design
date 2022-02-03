/**
 * Customer.js
 *
 * @description :: Customer model
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {
  attributes: {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING(80),
    },
    password: {
      type: Sequelize.STRING(80),
    },
    email: {
      type: Sequelize.STRING(80),
      validate: {
        isEmail: true,
      },
    },
    avatar: {
      type: Sequelize.STRING(200),
    },
    phone: {
      type: Sequelize.STRING(20),
      unique: true,
    },
    smsCode: {
      type: Sequelize.STRING(8),
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    lang: {
      type: Sequelize.STRING(10),
    },
    // userid: {
    //   type: Sequelize.STRING(200),
    // },
  },
  associations: function () {},
  defaultScope: function () {},
  options: {
    freezeTableName: false,
    tableName: "customer",
    classMethods: {},
    instanceMethods: {},
    hooks: {
      beforeCount: function (options) {
        //this is the FIX with findAndCountAll
        if (this._scope.include && this._scope.include.length > 0) {
          options.distinct = true;
          options.col =
            this._scope.col ||
            options.col ||
            `"${this.options.name.singular}".id`;
        }

        if (options.include && options.include.length > 0) {
          options.include = null;
        }
      },
    },
  },
};
