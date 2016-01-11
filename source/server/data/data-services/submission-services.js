'use strict';

let mongoose = require('mongoose'),
    Problem = mongoose.model('Problem'),
    problems = require('./problem-services'),
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
        //console.log('tok sme');
        problems.services
                .findProblemByContest(submission.contest, submission.problem.name)
                .then(function (problem) {
                    //console.log('in the promise');
                    submission.problemId = problem._id;
                    Submission.create(submission, function (error, sub) {
                        //console.log('in create callback');
                        problem.submissionIds.push(sub._id);
                        // problem.save(function (err, savedProblem){
                        //     if(err) {
                        //         console.log('err');
                        //         return reject(err);
                        //     }
                        //     resolve(savedProblem);
                        // })
                        
                        resolve(sub);
                    });
                }, error => { console.log(error); reject(error);});

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