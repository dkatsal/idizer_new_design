/**
 * 201 (Created) Handler
 *
 * Usage:
 * return res.created();
 *
 * e.g.:
 * ```
 * return res.created();
 * ```
 */

module.exports = function created(data) {
    let res = this.res;
    res.statusCode = 201;
    return res.send(data);
};