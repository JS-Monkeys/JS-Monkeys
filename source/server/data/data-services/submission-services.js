'use strict';

let mongoose = require('mongoose'),
    Problem = mongoose.model('Problem'),
    Submission = mongoose.model('Submission'),
    Users = mongoose.model('User');

function all() {
    let promise = new Promise(function (resolve, reject) {
        Submission.find({}, function (error, dbSubmissions) {
            if (error) {
                return reject(error);
            }

            resolve(dbSubmissions);
        })
    });

    return promise;
}

function createSubmission(submission) {
    let promise = new Promise(function (resolve, reject) {
        let data = require('../data');

        if (!submission || !submission.problem) {
            return reject('request is missing the problem id or problem name');
        }

        data.problems
            .findProblemByContest(submission.contest, submission.problem.name)
            .then(function (problem) {
                submission.problemId = problem._id;
                Submission.find({ problem: { name: problem.name }, user: { username: submission.user } }, function (err, contestSubs) {
                    console.log(contestSubs);
                    let best = contestSubs.sort((x, y) => y.points - x.points)[0];
                    console.log('best:');
                    console.log(best);
                    if ((best && best.points > submission.points) || !best) {
                        Users.findOne({ username: submission.user.username }, function (err, user) {
                            if (err) {
                                console.log(err);
                                return reject(err);
                            }
                            console.log('hereeeeeees');
                            if(best) {
                                user.points += submission.points + best.points;
                            } else {
                                user.points += submission.points;
                            }
                            console.log('in callback for user');
                            console.log(user);
                            user.save();
                        });
                    }

                    Submission.create(submission, function (error, sub) {
                        problem.submissionIds.push(sub._id);

                        resolve(sub);
                    });
                });

            }, function (error) {
                reject(error);
            });

    });

    return promise;
}

function findSubmission(options) {
    options = options || {};

    if (options.id) {
        options._id = options.id;
        options.id = undefined;
    }

    let promise = new Promise(function (resolve, reject) {

        Submission.findOne(options, function (error, dbSub) {
            if (error) {
                return reject(error);
            }

            resolve(dbSub);
        });

    });

    return promise;
}

module.exports = {
    name: 'submissions',
    services: {
        all,
        createSubmission,
        findSubmission
    }
};