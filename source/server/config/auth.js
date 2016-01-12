'use strict';

let passport = require('passport');

module.exports = {
    login: function (req, res, next) {

        let auth = passport.authenticate('local', function (error, user) {
            if (error) {
                return next(error);
            }

            if (!user) {
                return res.send({
                    success: false
                });
            }
                
            // use function attached to the request by passport
            req.logIn(user, function (error) {
                if (error) {
                    return next(error);
                }
                
                res.send({
                    success: true,
                    user: user
                });

               // res.redirect(req.get('referer'));
            });
        });

        auth(req, res, next);
    },
    logout: function (req, res, next) {
        req.logout();
        res.end();
    },
    isAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(403)
                .end();
        } else {
            next();
        }
    },
    isInRole: function (role) {
        return function (req, res, next) {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) !== -1) {
                next();
            } else {
                res.status(403)
                    .end();
            }
        }
    }
};