'use strict';

let _ = require('underscore');

let mongoose = require('mongoose'),
    Problem = mongoose.model('Problem'),
    Contest = mongoose.model('Contest');

function createProblem(problem) {
    if (problem) {

        problem = {
            name: problem.name,
            points: problem.points,
            constraints: problem.constraints,
            description: problem.description
        };
    }
    //console.log(problem.constraints);
    let promise = new Promise(function (resolve, reject) {
        Problem.create(problem, function (error, dbProblem) {
            if (error) {
                return reject(error);
            }

            resolve(dbProblem);
        });
    });

    return promise;
}

function findProblemByContest(contestName, problemName) {

    let promise = new Promise(function (resolve, reject) {
        Contest.findOne({ name: contestName }, function (dbError, contest) {
            if (dbError) {
                return reject(dbError);
            }
            
            for (let i = 0, length = contest.problems.length; i < length; i += 1) {
                if (contest.problems[i].name === problemName) {
                    console.log('found problem');
                    return resolve(contest.problems[i]);
                }
            }

            reject({
                error: `no problem with name "${problemName}" in contest "${contestName}"`
            });
        });
    });

    return promise;
}

function all() {
    let promise = new Promise(function (resolve, reject) {
        Contest.find({}, function (error, contests) {
            if (error) {
                return reject(error);
            }

            let result = _.pluck(contests, 'problems');
            resolve(result);
        });
    });

    return promise;
}

module.exports = {
    name: 'problems',
    services: {
        createProblem,
        findProblemByContest,
        all
    }
};