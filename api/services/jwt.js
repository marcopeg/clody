
var jwt = require('jsonwebtoken');

var SECRET = sails.config.jwtLogin.secret;
var COOKIE_OPTIONS = sails.config.jwtLogin.cookieOptions;

function cookie(res, payload) {
    var token = createToken(payload);
    res.cookie('Authorization', 'Bearer ' + token, COOKIE_OPTIONS);
}

function invalidateCookie(res) {
    res.cookie('Authorization', 'unauth', COOKIE_OPTIONS);
}

function createToken(payload) {
    return jwt.sign(payload, SECRET);
}

function validate(req) {
    try {
        return jwt.verify(req.cookies.Authorization.slice(7), SECRET);
    } catch (e) {
        return false;
    }
}

module.exports = {
    cookie: cookie,
    validate: validate,
    invalidateCookie: invalidateCookie,
}
