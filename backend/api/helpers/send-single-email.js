const nodemailer = require('nodemailer');

const mailConfig = {
  host: sails.config.custom.smtpHost,
  port: sails.config.custom.smtpPort,
  auth: {
    user: sails.config.custom.smtpUser,
    pass: sails.config.custom.smtpPassword
  }
};

module.exports = {

  friendlyName: 'Send single email',

  description: 'It uses for sending email.',

  inputs: {
    options:{
      type:'json'
    }
  },

  exits: {

  },

  fn: async function (inputs, exits) {
    const transporter = nodemailer.createTransport(mailConfig);

    transporter.sendMail(inputs.options, (error, info) => {
      if (error) {
        console.error('Error occurred. ' + err.message);
        return process.exit(1);
      }

      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    return exits.success();
  }

};

