/**
 * 200 (OK) Handler
 *
 * Usage:
 * return res.ok();
 *
 * e.g.:
 * ```
 * return res.ok();
 * ```
 */

module.exports = function success(data) {
    let res = this.res;
    res.statusCode = 200;
    return res.send(data);
};