'use strict';

let marked = require('marked'),
    fs = require('fs');

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
        }
    };
}