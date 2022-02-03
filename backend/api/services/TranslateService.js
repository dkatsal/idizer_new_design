/**
 * TranslateService.js
 *
 *  Example:
 *  TranslateService.__('Some value #%s', ['123']);
 *  TranslateService.__('Some value #%s', ['123'], 'ru');
 */
const fs = require('fs');

module.exports = {
  __: (string, placeholders = [], lang = '') => {
    if (sails.config.i18n.systemTranslate) {
      return sails.__(string, placeholders);
    }

    if (!lang) {
      lang = sails._lang ? sails._lang : 'en';
    }

    try {
      const rawdata = fs.readFileSync(__dirname + `/../../config/locales/${lang}.json`);
      const locales = JSON.parse(rawdata);

      let translatedText = (locales[string]) ? locales[string] : sails.__(string, placeholders);
      _.forEach(placeholders, (placeholder) => {
        translatedText = translatedText.replace('%s', placeholder);
      });

      return translatedText;
    } catch (err) {
      console.log(err);
      return sails.__(string, placeholders);
    }
  }
};
