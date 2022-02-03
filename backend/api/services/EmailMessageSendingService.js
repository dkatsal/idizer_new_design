/**
 * SmsService.js
 *
 *  Example:
 *  await EmailMessageSendingService.sendMessage(customer, mailOptions);
 */

const nodemailer = require('nodemailer');

module.exports = {
  sendMessage: async function (customer, mailOptions) {
    const mailConfig = {
      host: sails.config.custom.smtpHost,
      port: sails.config.custom.smtpPort,
      auth: {
        user: customer.email,
        pass: customer.password
      }
    };

    const transporter = nodemailer.createTransport(mailConfig);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error occurred. ' + err.message);
        return process.exit(1);
      }

      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  },
};
