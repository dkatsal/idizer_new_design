/**
 * SmsService.js
 *
 *  Example:
 *  await SmsService.sendSMS(phoneNumber, message);
 */
module.exports = {
  sendSMS: async function (phoneNumber, message, messageType = "ARN") {
    switch (sails.config.custom.smsService) {
      case "telesign":
        await this._teleSign(phoneNumber, message, messageType);
        break;
      case "twilio":
        await this._twilio(phoneNumber, message);
        break;
      default:
        await this._twilio(phoneNumber, message);
    }
  },
  _teleSign: async function (phoneNumber, message, messageType = "ARN") {
    const TeleSignSDK = require("telesignsdk");
    const client = new TeleSignSDK(
      sails.config.custom.teleSignCustomerId,
      sails.config.custom.teleSignApiKey,
      sails.config.custom.teleSignEndpoint,
      sails.config.custom.teleSignTimeout
    );

    client.sms.message(
      (error, responseBody) => {
        if (error) {
          sails.log.error(error);
          sails.log.info(responseBody);
          throw Error("Unable to send message. " + error);
        }
      },
      phoneNumber,
      message,
      messageType
    );
  },
  _twilio: async function (phoneNumber, message) {
    const client = require("twilio")(
      sails.config.custom.twilioAccountSid,
      sails.config.custom.twilioAuthToken
    );

    client.messages
      .create({
        body: message,
        from: sails.config.custom.twilioVirtualNumber,
        to: phoneNumber,
      })
      .then((msg) => res.send(msg));
  },
};
