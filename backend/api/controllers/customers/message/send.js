module.exports = {
  friendlyName: 'Send',
  description: 'Send message.',
  inputs: {
    from: {
      type: 'string',
      description: 'Sender email',
      required: true,
    },
    to: {
      type: 'string',
      description: 'Recipients emails',
      required: true,
    },
    subject: {
      type: 'string',
      description: 'Subject of message',
      required: true,
    },
    text: {
      type: 'string',
      description: 'Text of message',
      required: true,
    },
  },
  exits: {
    success: {
      responseType: 'success',
    },
    badRequest: {
      responseType: 'badRequest',
    },
  },
  fn: async function (inputs, exits) {
    try {
      const customer = this.req.session.customer;
      const mailOptions = {to: inputs.to, from: inputs.from, subject: inputs.subject, text: inputs.text};
      await EmailMessageSendingService.sendMessage(customer, mailOptions);
      return exits.success({
        message: TranslateService.__("Message was successfully sent."),
        data: { mailOptions },
      });
    } catch (e) {
      return exits.badRequest({
        message: TranslateService.__("Something went wrong!"),
        data: { error: e.message },
      });
    }
  }
};
