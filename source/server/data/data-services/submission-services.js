(function () {
    'use strict';

    let mongoose = require('mongoose'),
        Problem = mongoose.model('Problem'),
        Submission = mongoose.model('Submission');

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
            if (submission.problemId) {
                Problem.findOne({ id: submission.problemId }, function (error, dbProblem) {
                    if (error) {
                        return reject(error);
                    }

                    if (!dbProblem) {
                        return reject(error);
                    }

                    Submission.create(submission, function (error, dbSubmission) {
                        if (error) {
                            return reject(error);
                        }

                        dbProblem.submissionIds.push(dbSubmission._id);
                        resolve(dbSubmission);
                    });
                });
            }
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
} ());