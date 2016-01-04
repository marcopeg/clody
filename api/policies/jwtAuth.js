
var jwt = require('../services/jwt');

module.exports = function(req, res, next) {
    var payload = jwt.validate(req);

    if (payload) {
        req.jwtPayload = payload;
        next();
    } else {
        jwt.invalidateCookie(res);
        res.send(401, 'Invalid token');
    }
};
