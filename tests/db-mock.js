'use strict';

module.exports = {
        contests: {
            byName: function (name) {
                let contests = ['js ui & dom', 'c# oop']

                let promise = new Promise(function (resolve, reject) {
                    if (contests.indexOf(name) === -1) {
                        return reject('not found');
                    }
                    resolve(name);
                });

                return promise;
            },
            addProblemToContest: function (name, problem) {
                
                let contestNames = ['angular', 'node'];
                
                let promise = new Promise(function (resolve, reject) {
                    if(contestNames.indexOf(name) !== -1) {
                        return reject('contest not found');
                    }
                    
                    resolve(problem);
                });
                
                return promise;
            },
            submissions: function (query, sort) {

                let submission = {
                    'user.username': 'penka',
                    'problem.name': 'dish washing',
                    madeOn: new Date(),
                    _id: '1234',
                    points: 20
                };
                
                let promise = new Promise(function (resolve, reject) {
                    if(submission['user.username'] === query['user.username'] 
                       && submission['problem.name'] === query['problem.name']) {
                           return resolve([submission]);
                       }
                       
                    reject('not found');
                });
                
                return promise;
            }
        }
    };