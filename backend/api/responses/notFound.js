/**
 * 404 (Not Found) Handler
 *
 * Usage:
 * return res.notFound();
 *
 * e.g.:
 * ```
 * return res.notFound();
 * ```
 */

module.exports = function notFound(data) {
    let res = this.res;
    res.statusCode = 404;
    return res.send(data);
};