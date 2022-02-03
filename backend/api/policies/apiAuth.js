module.exports = function (req, res, next) {

  sails.log('>>>>>>>>>>>>>REQ>>>>>>>>>>>>>:');
  sails.log('URL:', req.url);
  sails.log('HEADERS:', req.headers);
  sails.log('PARAM:', req.params);
  sails.log('BODY: ', req.body);
  sails.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

  if (req.headers['x-api-key'] !== sails.config.custom.apiAuthKey) {
    return res.unauthorized({message: TranslateService.__("Incorrect API key"), data: {}});
  }
  return next();
};
