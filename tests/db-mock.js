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
                if (contestNames.indexOf(name) !== -1) {
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
                if (submission['user.username'] === query['user.username']
                    && submission['problem.name'] === query['problem.name']) {
                    return resolve([submission]);
                }

                reject('not found');
            });

            return promise;
        }
    },
    users: {
        users: [
            {
                username: 'penka',
                points: 20,
            },
            {
                username: 'ginka',
                points: 30,
            },
            {
                username: 'minka',
                points: 44,
            },
        ],
        all: function () {
            let promise = new Promise(function (resolve, reject) {
                resolve(this.users);
            });

            return promise;
        },
        findByRank: function (from, to, count) {
            let promise = new Promise(function (resolve, reject) {
                resolve(this.users.filter(x => x.points >= from && x.points <= to).slice(count));
            });

            return promise;
        },
        byUsername: function (username) {
            let promise = new Promise(function (resolve, reject) {
                let result = this.users.find(x => x.username === username);

                if (result) {
                    return resolve(result);
                }

                reject('not found');
            });

            return promise;
        },
        createUser: function (user) {
            let promise = new Promise(function (resolve, reject) {
                return user ? resolve(user) : reject('error');
            });

            return promise;
        }
    },
    submissions: {
        all: function (shouldResolve) {
            let promise = new Promise(function (resolve, reject) {
                shouldResolve ? resolve([{ id: '12' }, { id: '45' }, { id: '12342' }, { id: '1' }, { id: '9' }]) : reject('submission for user not found');
            });
            
            return promise;
        }
    }
};