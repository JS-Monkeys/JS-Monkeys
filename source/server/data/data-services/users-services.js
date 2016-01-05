(function () {
    'use strict';

    let mongoose = require('mongoose'),
        encryption = require('../../utils/encryption'),
        User = mongoose.model('User');
    
    // TODO: remove redundant code
    module.exports = {
        name: 'users',
        services: {
            all: function () {

                let promise = new Promise(function (resolve, reject) {

                    User.find({}, function (error, users) {
                        if (error) {
                            return reject(error);
                        }

                        resolve(users);
                    });

                });

                return promise;
            },
            createUser: function (user) {

                let salt = encryption.generateSalt();
                let dbUser = {
                    username: user.username,
                    salt: salt,
                    passHash: encryption.hashPassword(salt, user.password)
                };

                let promise = new Promise(function (resolve, reject) {
                    User.create(dbUser, function (error, createdUser) {
                        if (error) {
                            return reject(error);
                        }

                        resolve(createdUser);
                    });
                });

                return promise;
            },
            byUsername: function (username) {

                let promise = new Promise(function (resolve, reject) {

                    User.findOne({ username }, function (error, users) {
                        if (error) {
                            return reject(error);
                        }

                        resolve(users);
                    });

                });

                return promise;
            },
            byId: function (id) {
                
                let promise = new Promise(function (resolve, reject) {

                    User.findOne({ _id: id }, function (error, users) {
                        if (error) {
                            return reject(error);
                        }

                        resolve(users);
                    });

                });

                return promise;
            }
        }
    };
} ());