'use strict';

let Contest = require('mongoose').model('Contest');

function filter(options) {

    options = options || {};

    let promise = new Promise(function (resolve, reject) {
 console.log(options);
        Contest.find(options)
            .populate('problems')
            .exec(function (dbError, contests) {
            if (dbError) {
                 console.log(contests);
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
        Contest.findOne(options)
            .populate('problems')
            .exec(function (dbError, dbContest) {
            if (dbError) {
                console.log(dbError);
                return reject(dbError);
            }

            resolve(dbContest);
        });
    });

    return promise;
}

function create(contest){

    if(contest){
        let dbContest = {
            name: contest.name,
            startDate:contest.startDate,
            endDate:contest.endDate,
            problems: contest.problems
        };

        let promise = new Promise(function (resolve, reject) {
            Contest.create(dbContest, function (error, createdContest) {
                if (error) {
                    return reject(error);
                }
                if(dbContest.problems){
                    for (var i = 0; i < dbContest.problems.length; i += 1) {
                        dbContest.problems[i]._contest = createdContest._id;
                    }
                }
                resolve(createdContest.name);
            });
        });

        return promise;
    }
}

module.exports = {
    name: 'contests',
    services: {
        all: filter,
        byName: function (name) {
            return findContest({ name });
        },
        create(contest){
            return create(contest);
        }
    }
}