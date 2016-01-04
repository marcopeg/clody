
var jwt = require('../services/jwt');

var uname = sails.config.jwtLogin.uname;
var passw = sails.config.jwtLogin.passw;

module.exports = {
    
    login: function(req, res) {
        var isAllowed = (
            req.body.uname === uname &&
            req.body.passw === passw
        );

        if (isAllowed) {
            var payload = {
                uname: 'YouCollide',
            };

            jwt.cookie(res, payload);
            res.send(payload);
        } else {
            jwt.invalidateCookie(res);
            res.send(401, 'Unknown user');
        }
    },

    logout: function(req, res) {
        jwt.invalidateCookie(res);
        res.send('done');
    },

    // @jwtAuth
    check: function(req, res) {
        res.send(req.jwtPayload);
    },

};
