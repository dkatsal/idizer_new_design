module.exports = {
  friendlyName: "MessageGet",
  description: "Get messages by filter.",
  inputs: {
    folder: {
      type: ["string", "string"],
      description: "Folder of messages (inbox, drafts, etc.)",
      required: true,
    },
    searchCriteria: {
      type: ["ref"],
      description: "Messages filters",
      required: false,
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
      const customer = this.req.session.customer;
      const searchCriteria = inputs.searchCriteria
        ? inputs.searchCriteria
        : ["ALL"];

      const messages = await EmailMessageReceivingService.getMessages(
        customer,
        inputs.folder,
        searchCriteria
      );
      const reverseMessages = messages.map((item, index) => {
        reversedFolder = item[inputs.folder[index]].reverse();
        return { [inputs.folder[index]]: reversedFolder };
      });

      return exits.success({
        message: TranslateService.__("Messages was successfully received."),
        data: reverseMessages,
      });
    } catch (e) {
      return exits.badRequest({
        message: TranslateService.__("Something went wrong!"),
        data: { error: e.message },
      });
    }
  },
};
