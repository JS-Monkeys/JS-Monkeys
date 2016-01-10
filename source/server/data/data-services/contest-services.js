'use strict';
let mongoose = require('mongoose'),
    Contest = mongoose.model('Contest'),
    Problem = mongoose.model('Problem');

function filter(options) {

    options = options || {};

    let promise = new Promise(function (resolve, reject) {
        Contest.find(options, function (error, contests) {
            if(error) {
                return reject(error);
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
        Contest.findOne(options, function (error, contest) {
            if(error) {
                return reject(error);
            }
            
            resolve(contest);
        });
    });

    return promise;
}

function create(contest) {

    if (contest) {
        let dbContest = {
            name: contest.name,
            startDate: contest.startDate,
            endDate: contest.endDate,
            problems: contest.problems
        };

        let promise = new Promise(function (resolve, reject) {
            Contest.create(dbContest, function (error, createdContest) {
                if (error) {
                    return reject(error);
                }
                if (dbContest.problems) {
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

function addProblemToContest(contestName, problem) {

    let promise = new Promise(function (resolve, reject) {

        Contest.findOne({ name: contestName }, function (error, dbContest) {
            if (error) {
                return reject(error);
            }

            let dbProblem = new Problem(problem);

            dbProblem._contestId = dbContest._id;

            dbContest.problems.push(dbProblem);

            dbContest.save(function (saveError, saveResult) {
                if (saveError) {
                    return reject(saveError);
                }

                resolve(dbProblem);
            });


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
        },
        create: create,
        addProblemToContest: addProblemToContest
    }
}