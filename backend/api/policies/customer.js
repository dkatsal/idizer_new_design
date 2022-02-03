module.exports = async function (req, res, next) {
  const token = req.headers["authorization-token"] || "";
  const deviceId = req.session.device.deviceId || "";

  if (!token) {
    return res.unauthorized({
      message: TranslateService.__("Authorization-Token was not send."),
      data: { token },
    });
  }

  const uid = await TokenService.validateToken(token, "customer", deviceId);

  if (!uid) {
    return res.unauthorized({
      message: TranslateService.__("Invalid token."),
      data: { token },
    });
  }

  const customer = await Customer.findOne({ where: { id: uid } });

  if (!customer) {
    return res.notFound({
      message: TranslateService.__("User was not found."),
      data: {},
    });
  }

  req.session.customer = customer;
  req.session.token = token;

  return next();
};
