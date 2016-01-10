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
console.log(problem.constraints);
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

function findProblem(options) {
    options = options || {};

    if (options.id) {
        options._id = options.id;
        options.id = undefined;
    }

    let promise = new Promise(function (resolve, reject) {

        Problem.findOne(options, function (error, problem) {
            if (error) {
                return reject(error);
            }

            resolve(problem);
        });

    });

    return promise;
}

function all() {
    let promise = new Promise(function (resolve, reject) {
        Contest.find({}, function (error, contests) {
           if(error) {
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
        findProblem,
        all
    }
};