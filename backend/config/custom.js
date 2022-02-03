/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {
  /***************************************************************************
   *                                                                          *
   * idizer API settings                                                 *
   *                                                                          *
   ***************************************************************************/
  apiAuthKey: "RgUkXp2s5v8y/B?E(H+KbPeShVmYq3t6",
  tokenLimit: {
    customer: 3,
    rider: 3,
    admin: 5,
  },

  /***************************************************************************
   *                                                                          *
   * AWS WorkMail settings                                                    *
   *                                                                          *
   ***************************************************************************/
  awsAccessKeyId: "AKIARIXRQSD63A43DPWP",
  awsSecretAccessKey: "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",
  workMailRegion: "us-west-2",
  workMailOrganisationId: "m-7eeb665c010b47c099238431e22d3902",
  workMailDomain: "idizer.awsapps.com",

  /***************************************************************************
   *                                                                          *
   * IMAP settings                                                            *
   *                                                                          *
   ***************************************************************************/
  imapHost: "imap.mail.us-west-2.awsapps.com",
  imapPort: 993,
  // smtpUser: 'user',
  // smtpPassword: 'pass',
  // smtpFrom: 'support@idizer.com',

  /***************************************************************************
   *                                                                          *
   * SMTP settings                                                            *
   *                                                                          *
   ***************************************************************************/
  smtpHost: "smtp.mail.us-west-2.awsapps.com",
  smtpPort: 465,
  // smtpUser: 'user',
  // smtpPassword: 'pass',
  // smtpFrom: 'support@idizer.com',

  /**************************************************************************
   *                                                                         *
   * SMS service settings (telesign.com)                                     *
   *                                                                         *
   **************************************************************************/
  smsFrom: "Idizer",
  smsService: "twilio",
  //telesign
  teleSignEndpoint: "https://rest-api.telesign.com",
  teleSignCustomerId: "",
  teleSignApiKey: "",
  teleSignTimeout: 10000,
  //twilio
  twilioAccountSid: "AC1b0aea9534836a305e01941030e5a7ff",
  twilioAuthToken: "890c6e534f7eb87585ab80b58556b62d",
  twilioVirtualNumber: "+12055962532",
  //
  devModeHosts: ["http://localhost:1337"],

  /***************************************************************************
   *                                                                          *
   * Any other custom config this Sails app should use during development.    *
   *                                                                          *
   ***************************************************************************/
  // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
  // stripeSecret: 'sk_test_Zzd814nldl91104qor5911gjald',
  // …
};
