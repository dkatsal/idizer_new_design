/**
 * 409 (Conflict) Handler
 *
 * Usage:
 * return res.alreadyExists();
 *
 * e.g.:
 * ```
 * return res.alreadyExists();
 * ```
 */

module.exports = function conflict(data) {
    let res = this.res;
    res.statusCode = 409;
    return res.send(data);
};