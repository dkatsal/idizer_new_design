/* eslint-disable linebreak-style */

/**
 * EmailRegisterService.js
 *
 *  Example:
 *  await EmailRegisterService.emailExists(email);
 */
const AWS = require('aws-sdk');
const passwordGenerator = require('generate-password');

const workMailClient = {
  accessKeyId: sails.config.custom.awsAccessKeyId,
  secretAccessKey: sails.config.custom.awsSecretAccessKey,
  region: sails.config.custom.workMailRegion,
};
const workMail = new AWS.WorkMail(workMailClient);
const passwordOptions = {
  length: 8,
  numbers: true,
  uppercase: true,
  lowercase: true,
  symbols: true,
};

module.exports = {
  emailExists: async (email) => {
    if (!email) {
      return false;
    }
    const re = /[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+/;
    return re.test(String(email).toLowerCase());
  },

  setupEmail: async (phone) => {
    const phoneNumbers = phone.split('+').join('');
    const password = passwordGenerator.generate(passwordOptions);
    const createUserProperties = {
      DisplayName: phoneNumbers,
      Name: phoneNumbers,
      OrganizationId: sails.config.custom.workMailOrganisationId,
      Password: password,
    };
    const email = phoneNumbers + '@' + sails.config.custom.workMailDomain;

    let retVal = null;

    await workMail.createUser(createUserProperties, (err, data) => {
      if (err) {
        retVal = err;
        // TODO: any exceptions aren't handled
        // throw { name: 'AWS WorkMail.createUser error', message: err };
      } else {
        workMail.registerToWorkMail(
          {
            Email: email,
            EntityId: data.UserId,
            OrganizationId: sails.config.custom.workMailOrganisationId,
          },
          (err, res) => {
            if (err) {
              retVal = err;
              // throw { name: 'AWS WorkMail.registerToWorkMail error', message: err };
            } else {
              Customer.update({ email, password }, { where: { phone: phone } });
              // throw { message: email + ' ' + customer.phone};
            }
          }
        );
      }
    });
    return retVal;
  },
};
