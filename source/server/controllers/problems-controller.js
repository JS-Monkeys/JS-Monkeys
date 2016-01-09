'use strict';

let data = require('../data/data'),
    marked = require('marked'),
    fs = require('fs');

module.exports = {
    getDescription: function (req, res) {

        fs.readFile(`./server/problems/${req.params.name}/DESCRIPTION.md`, function (error, file) {
            res.render('problem', {
                name: req.params.name,
                marked: marked,
                desc: file.toString()
            });
        });
    },
    createProblem: function (req, res) {
        data.problems.createProblem(req.body.problem)
                     .then(r => res.json(r), err => res.json(err));
    }
};