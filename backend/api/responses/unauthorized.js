/**
 * 401 (Unauthorized) Handler
 *
 * Usage:
 * return res.unauthorized();
 *
 * e.g.:
 * ```
 * return res.unauthorized();
 * ```
 */

module.exports = function unauthorized(data) {
    let res = this.res;
    res.statusCode = 401;

    return res.send(data);
};