'use strict';

let marked = require('marked'),
    fs = require('fs'),
    path = require('path'),
    uploading = require('../utils/uploading');

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
        testsPage: function (req, res) {

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
        },
        uploadTests: function (req, res) {
            // pipe stream to busboy
            req.pipe(req.busboy);
            
            // on file, save the test file in the folder for it's problem
            req.busboy.on('file', function (fieldname, file, filename) {
                uploading.saveFile(file, req.params.problem, filename);
            });
            
            // reload the page
            req.busboy.on('finish', function () {
                res.redirect(req.get('referer'));
            });
        }
    };
}