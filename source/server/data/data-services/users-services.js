'use strict';

let mongoose = require('mongoose'),
    encryption = require('../../utils/encryption'),
    User = mongoose.model('User');

function findUser(options) {

    options = options || {};

    if (options.id) {
        options._id = options.id;
        options.id = undefined;
    }

    let promise = new Promise(function (resolve, reject) {

        User.findOne(options, function (error, users) {
            if (error) {
                return reject(error);
            }

            resolve(users);
        });

    });

    return promise;
}

function getUsers(options) {

    options = options || {};

    let promise = new Promise(function (resolve, reject) {

        User.find(options)
            .sort({ points: -1 })
            .exec(function (error, users) {
                if (error) {
                    return reject(error);
                }
                resolve(users);
            });
    });

    return promise;
}

function createUser(user) {

    let salt = encryption.generateSalt();
    let dbUser = {
        username: user.username,
        email: user.email,
        salt: salt,
        passHash: encryption.hashPassword(salt, user.password),
        roles: user.roles || ['standard']
    };

    let promise = new Promise(function (resolve, reject) {
        User.create(dbUser, function (error, createdUser) {
            if (error) {

                console.log(error);
                reject(error);
            }

            resolve(createdUser);
        });
    });

    return promise;
}

function findByRank(from, to, numberOfRecords) {
    let options = {
        points: {
            "$gte": from,
            "$lte": to
        }
    };
    let promise = new Promise(function (resolve, reject) {

        User.find(options)
            .sort({ points: -1 })
            .limit(numberOfRecords)
            .exec(function (error, users) {
                if (error) {
                    return reject(error);
                }
                resolve(users);
            });
    });

    return promise;
}

module.exports = {
    name: 'users',
    services: {
        all: getUsers,
        createUser: createUser,
        byUsername: function (username) {
            return findUser({ username });
        },
        byId: function (id) {
            return findUser({ _id: id });
        },
        findByRank: function (from, to, numberOfRecords) {
            return findByRank(from, to, numberOfRecords);
        }
    }
};