module.exports = {
  friendlyName: "Verify",
  description: "Verify code.",
  inputs: {
    phone: {
      type: "string",
      description: "Phone Number",
      required: true,
    },
    smsCode: {
      type: "string",
      description: "smsCode",
      required: true,
    },
  },
  exits: {
    success: {
      responseType: "success",
    },
    notFound: {
      responseType: "notFound",
    },
    badRequest: {
      responseType: "badRequest",
    },
  },
  fn: async function (inputs, exits) {
    try {
      const { phone, smsCode } = inputs;
      const { deviceId, deviceMeta } = this.req.session.device;

      const customer = await Customer.findOne({
        where: { phone, smsCode },
        raw: true,
      });
      if (!customer) {
        return exits.notFound({
          message: TranslateService.__("SMS code is not valid."),
          data: { smsCode },
        });
      }

      if (!(await EmailRegisterService.emailExists(customer.email))) {
        try {
          await EmailRegisterService.setupEmail(phone);
        } catch (e) {
          return exits.badRequest({
            message: TranslateService.__("Can't create email!"),
            data: { error: e.message },
          });
        }
      }

      customer.lang = customer.lang ? customer.lang : "ru";

      this.req.session.customer = customer;

      await Customer.update(
        {
          smsCode: "",
          status: true,
          lang: customer.lang,
        },
        { where: { phone, smsCode } }
      );
      const token = await TokenService.generateToken(
        customer,
        "customer",
        deviceId,
        deviceMeta
      );

      return exits.success({
        message: TranslateService.__("Welcome back!"),
        data: { customer, token },
      });
    } catch (e) {
      return exits.badRequest({
        message: TranslateService.__("Something went wrong!"),
        data: { error: e.message },
      });
    }
  },
};
