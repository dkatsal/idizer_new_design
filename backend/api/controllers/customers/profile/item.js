module.exports = {
  friendlyName: "ProfileItem",
  description: "Get profile",
  inputs: {},
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
      const { id } = this.req.session.customer;
      const customer = await Customer.findOne({ where: { id } });
      const token = this.req.session.token;
      // let qwe;
      // if (await EmailRegisterService.emailExists(customer.email)) {
      //   qwe = await EmailRegisterService.userInfo(customer.userid);
      // }

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
