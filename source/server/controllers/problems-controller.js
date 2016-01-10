'use strict';

let marked = require('marked'),
    fs = require('fs'),
    path = require('path');

const testsPath = path.join(__dirname, '../problems/');

module.exports = function (data) {
    return {
        createProblem: function (req, res) {
            data.problems.createProblem(req.body.problem)
                .then(r => res.json(r), err => res.json(err));
        },
        problemsAsJson: function (req, res) {
            data.problems.all()
                .then(problems => res.json(problems),
                    error => res.json(error));
        },
        tests: function (req, res) {

            fs.readdir(testsPath + req.params.problem, function (error, files) {
                if (error) {
                    return res.json(error);
                }
                
                res.render('problems/tests', {
                    problem: req.params.problem,
                    menuResolver: req.menuResolver,
                    tests: files.map(String)
                });
            });
        }
    };
}