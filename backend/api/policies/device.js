module.exports = function (req, res, next) {
  const deviceId = req.headers['device-id'] || '';
  const deviceMeta = req.headers['device-meta'] ? JSON.parse(req.headers['device-meta']) : null;

  if (!deviceId) {
    return res.unauthorized({message: TranslateService.__("Device-id was not send."), data: {}});
  }

  req.session.device = { deviceId , deviceMeta };

  return next();
};
