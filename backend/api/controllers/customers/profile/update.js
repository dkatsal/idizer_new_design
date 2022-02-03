module.exports = {
  friendlyName: "ProfileUpdate",
  description: "Update profile",
  inputs: {
    name: {
      type: "string",
      description: "Customer Name",
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
      const token = this.req.session.token;
      const { id } = this.req.session.customer;
      const { lang } = this.req.session;

      // const { deviceId, deviceMeta } = this.req.session.device;

      const result = await Customer.update(
        { ...inputs, lang },
        { where: { id }, returning: true, raw: true }
      );
      console.log("result ==", result);
      // if (socketToken) {
      //   await TokenService.updateSocketToken(id, 'customer', token, socketToken, deviceId, deviceMeta);
      // }
      return exits.success({
        message: TranslateService.__("Your profile was successfully updated."),
        data: { customer: result[1].shift() },
      });
    } catch (e) {
      return exits.badRequest({
        message: TranslateService.__("Something went wrong!"),
        data: { error: e.message },
      });
    }
  },
};
