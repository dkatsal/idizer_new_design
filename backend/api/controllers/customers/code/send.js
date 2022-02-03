module.exports = {
  friendlyName: "Send",
  description: "Send code.",
  inputs: {
    phone: {
      type: "string",
      description: "Phone Number",
      required: true,
    },
  },
  exits: {
    success: {
      responseType: "success",
    },
    badRequest: {
      responseType: "badRequest",
    },
  },
  fn: async function (inputs, exits) {
    try {
      const { phone: oldPhone } = inputs;
      const phone = oldPhone.split(" ").join("");
      const smsCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      const message = TranslateService.__("Your code is %s.", [smsCode]);
      const host = this.req.baseUrl;
      const devMode =
        sails.config.custom.devModeHosts.indexOf(host) === -1 ? false : true;
      const avatar = "https://avatar.png";

      const customer = await Customer.findOne({ where: { phone } });
      if (!customer) {
        await Customer.create({
          phone,
          smsCode,
          socketToken: "",
          avatar,
        });
      } else {
        await Customer.update({ smsCode }, { where: { phone } });
      }

      if (!devMode) {
        await SmsService.sendSMS(phone, message);
        return exits.success({
          message: TranslateService.__("SMS code was successfully sent."),
          data: { phone },
        });
      }

      return exits.success({
        message: TranslateService.__("SMS code was successfully sent."),
        data: { phone, smsCode },
      });
    } catch (e) {
      return exits.badRequest({
        message: TranslateService.__("Something went wrong!"),
        data: { error: e.message },
      });
    }
  },
};
