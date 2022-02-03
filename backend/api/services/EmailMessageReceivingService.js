/* eslint-disable linebreak-style */

/**
 * SmsService.js
 *
 *  Example:
 *  await EmailMessageReceivingService.getMessages(customer, searchCriteria);
 */

const imaps = require('imap-simple');
const simpleParser = require('mailparser').simpleParser;
const _ = require('lodash');
const inspect = require('util').inspect;

module.exports = {
  getMessages: async function (customer, folder, searchCriteria) {
    const config = {
      imap: {
        user: customer.email,
        password: customer.password,
        host: sails.config.custom.imapHost,
        tlsOptions: { servername: sails.config.custom.imapHost },
        port: sails.config.custom.imapPort,
        tls: true,
        authTimeout: 5000,
      },
    };

    const allMes = await Promise.all(
      folder.map(async (elem) => {
        const connection = await imaps.connect(config);
        await connection.openBox(elem);
        // connection.append(message.toString(), {
        //   mailbox: 'Drafts',
        //   flags: '\\Draft',
        // });

        const fetchOptions = {
          bodies: [''],
        };
        const results = await connection.search(searchCriteria, fetchOptions);

        const messages = await Promise.all(
          results.map(async (item) => {
            const all = _.find(item.parts, { which: '' });
            let mail = await simpleParser(all.body);
            delete mail.headers;
            delete mail.headerLines;
            delete mail.html;
            delete mail.textAsHtml;
            delete mail.to.html;
            delete mail.to.text;
            delete mail.from.html;
            delete mail.from.text;
            delete mail.references;
            mail.date;
            await EmailMessageReceivingService._updateCommunicatorsProperties(
              mail.from
            );
            await EmailMessageReceivingService._updateCommunicatorsProperties(
              mail.to
            );
            await EmailMessageReceivingService._updateCommunicatorsProperties(
              mail.cc
            );
            await EmailMessageReceivingService._updateCommunicatorsProperties(
              mail.bcc
            );
            return mail;
          })
        );
        connection.end();

        return { [elem]: messages };
      })
    );
    return allMes;
  },
  _updateCommunicatorsProperties: async function (communicators) {
    // communicators is 'from' or 'to' field of mail
    if (!communicators) {
      return;
    }

    communicators = await Promise.all(
      communicators.value.map(async (user) => {
        const customer = await Customer.findOne({
          where: { email: user.address },
          raw: true,
        });
        if (customer && customer.name) {
          user.name = customer.name;
        }
        // if (customer && customer.avatar) {
        //   user.avatar = customer.avatar;
        // }
        return user;
      })
    );
  },
};
