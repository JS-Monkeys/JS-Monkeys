(function () {
    'use strict';

    const dummySubmission = {
        taskInfo: {
            count: 2,
            name: 'test',
        },
        code: 'console.log(args);'
    },
        path = require('path').join(__dirname, 'js-executor.js');

    let data = require('../../data/data');

    module.exports = function (submission) {
        
        let promise = new Promise(function (resolve, reject) {
            submission = submission || dummySubmission;
            console.log(submission);
            data.problems
                .findProblem({ name: submission.taskName })
                .then(function (problem) {

                    if (!problem) {
                        console.log('alooo');
                        reject('problem not found in db');
                        return;
                    }

                    submission.taskInfo = {
                        count: problem.testCount,
                        constraints: problem.constraints
                    };

                    let process = require('child_process');

                    let child = process.spawn('node', [path]);
                    child.stdin.write(JSON.stringify(submission));
                    child.stdout.on('data', d => resolve({
                        results: d.toString().split(',')
                    }));
                }, function (error) {
                    console.log('could not load problem from db');
                    reject(error);
                });
        });

        return promise;

        //         let process = require('child_process');
        // 
        //         let child = process.spawn('node', [path]);
        //         child.stdin.write(JSON.stringify(submission));
        //         child.stdout.on('data', d => console.log(d.toString()));
    }
} ());