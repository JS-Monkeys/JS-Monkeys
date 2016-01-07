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

            if (!submission || !submission.problem) {
                return reject('request is missing the problem id or problem name');
            }

            Problem.findOne({ name: submission.problem.name }, function (error, dbProblem) {
                if (error) {
                    console.log({ error: 'error at submission-services:' + error });
                    return reject(error);
                }

                if (!dbProblem) {
                    return reject({ error: 'no problem with such ID' });
                }
                
                Submission.create(submission, function (error, dbSubmission) {
                    if (error) {
                        return reject(error);
                    }

                    dbProblem.submissionIds.push(dbSubmission._id);
                    dbProblem.save();
                    resolve(dbSubmission);
                });
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
} ());