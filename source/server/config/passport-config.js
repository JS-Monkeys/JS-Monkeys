(function () {
    'use strict';

    let passport = require('passport'),
        LocalPassport = require('passport-local'),
        session = require('express-session'),
        data = require('../data/data');

    module.exports = function (server) {
        
        // insert middleware
        server.use(session({ secret: 'huc huc' }));
        server.use(passport.initialize());
        server.use(passport.session());

        // set local auth strategy
        passport.use(new LocalPassport({
            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, function (req, username, password, done) {
            data.users
                .byUsername(username)
                .then(function (dbUser) {
                    if (dbUser && dbUser.authenticate(password)) {
                        return done(null, dbUser);
                    }
                    else {
                        return done(null, false);
                    }
                }, function (error) {
                    console.log(error);
                    done(error, false);
                });
        }));

        passport.serializeUser(function (user, done) {
            if (user) {
                return done(null, user._id);
            }
        });

        passport.deserializeUser(function (id, done) {
            data.users
                .byId(id)
                .then(function (dbUser) {
                    if (dbUser) {
                        return done(null, dbUser);
                    } else {
                        return done(null, false);
                    }
                }, function (error) {
                    console.log(error);
                    done(error, false);
                });
        });
    }
} ());