'use strict';

let marked = require('marked'),
    fs = require('fs'),
    _ = require('underscore'),
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
            console.log(req.query);
            if(!fs.existsSync(testsPath + req.params.problem)) {
                
                fs.mkdirSync(testsPath + req.params.problem);
            }
            
            fs.readdir(testsPath + req.params.problem, function (error, files) {
                if (error) {
                    return res.json(error);
                }
                
                let paginatedFiles = _.chain(files)
                                            .rest(((req.query.page - 1) || 0) * 10)
                                            .take(10)
                                            .value();

                res.render('problems/tests', {
                    problem: req.params.problem,
                    menuResolver: req.menuResolver,
                    tests: paginatedFiles.map(String)
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
        },
        updateTests: function (req, res) {
            console.log('update tests called');
            req.pipe(req.busboy);
            
            console.log(req.params.problem);
            // on file, overwrite the existing file
            req.busboy.on('file', function (fieldname, file, filename) {
                uploading.overwriteFile(file, req.params.problem, filename);
            });
            
            // reload the page
            req.busboy.on('finish', function () {
                res.redirect(req.get('referer'));
            });
        }
    };
}