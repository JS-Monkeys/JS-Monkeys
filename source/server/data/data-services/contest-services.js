'use strict';

let Contest = require('mongoose').model('Contest');

function filter(options) {

    options = options || {};

    let promise = new Promise(function (resolve, reject) {

        Contest.find(options, function (dbError, contests) {
            if (dbError) {
                console.log(dbError);
                return reject(dbError);
            }

            resolve(contests);
        });

    });

    return promise;
}

function findContest(options) {

    options = options || {};

    if (options.id) {
        options._id = options.id;
        options.id = undefined;
    }

    let promise = new Promise(function (resolve, reject) {
        Contest.findOne(options, function (dbError, dbContest) {
            if (dbError) {
                console.log(dbError);
                return reject(dbError);
            }

            resolve(dbContest);
        });
    });

    return promise;
}

module.exports = {
    name: 'contests',
    services: {
        all: filter,
        byName: function (name) {
            return findContest({ name });
        }
    }
}