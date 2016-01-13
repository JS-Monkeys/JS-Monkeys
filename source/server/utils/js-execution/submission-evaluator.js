'use strict';

const path = require('path').join(__dirname, 'js-executor.js');

let data = require('../../data/data');

module.exports = function (submission) {

    let promise = new Promise(function (resolve, reject) {
        if (!submission) {
            return reject({ error: 'invalid submission' });
        }

        data.problems
            .findProblemByContest(submission.contest, submission.task)
            .then(function (problem) {

                if (!problem) {
                    return reject('problem not found in db');
                }

                submission.taskInfo = {
                    count: problem.testCount,
                    constraints: problem.constraints
                };

                let process = require('child_process'),
                    child = process.spawn('node', [path]);
                    
                // stream the submission to the user
                child.stdin.write(JSON.stringify(submission));

                child.stderr.on('data', error => console.log(error.toString()));
                
                // on output from the executor
                child.stdout.on('data', function (result) {
                    let testResults = result.toString().split(',');

                    let passedTests = testResults.map(testResult => (testResult === 'true' ? 1 : 0))
                        .reduce((memo, val) => memo + val);
                    
                    // save the evaluated submission
                    data.submissions.createSubmission({
                        problem: {
                            name: submission.task
                        },
                        contest: submission.contest,
                        user: submission.user,
                        code: submission.code,
                        points: problem.points * passedTests / testResults.length
                    })
                        .then(function (dbres) {
                            let response = result.toString().split(',').map(x => x === 'true');
                            resolve(response);
                        }, function (dbError) {
                            console.log('could not save submission in the db');
                            reject(dbError);
                        });
                });
            }, function (error) {
                console.log('could not load problem from db');
                reject(error);
            });
    });

    return promise;
}