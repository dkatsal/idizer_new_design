/**
 * 400 (Bad Rerequest) Handler
 *
 * Usage:
 * return res.badRerequest();
 *
 * e.g.:
 * ```
 * return res.badRerequest();
 * ```
 */

module.exports = function badRequest(data) {
  let res = this.res;
  res.statusCode = 400;

  if (data.code)  {
    switch (data.code) {
      case 'E_MISSING_OR_INVALID_PARAMS':
        data = { 'message': TranslateService.__('Missing or incorrect values for required fields.'), data };
        break;
    }
  }

  return res.send(data);
};
