module.exports = function (req, res, next) {
  if (!req.headers['content-language'] ||  sails.config.i18n.locales.indexOf(req.headers['content-language']) === -1 ) {
    //return res.unauthorized({message: TranslateService.__("Incorrect language"), data: {}});
  }

  req.setLocale(req.headers['content-language']);
  req.session.lang = req.headers['content-language'];
  sails._lang = req.headers['content-language'];

  return next();
};
