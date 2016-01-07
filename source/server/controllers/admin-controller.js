(function () {
    'use strict';

    let uploading = require('../utils/uploading'),
        data = require('../data/data');
    
    // TODO: remove development functions
    module.exports = {
        uploadPage: function (req, res) {
            res.render('admin', {});
        },
        uploadFile: function (req, res) {
            console.log('gosho');
            req.pipe(req.busboy);

            req.busboy.on('file', function (fieldname, file, filename) {
                uploading.saveFile(file, 'testtest', filename);
            });

            req.busboy.on('finish', function () {
                res.send('<h1>Success!</h1>');
            });
        },
        homePrivate: function (req, res) {
            res.send('<h1>Authorized!</h1>');
        },
        addProblem: function (req, res) {
            data.problems
                    .createProblem(req.body.problem)
                    .then(function (response) {
                        res.status(201)
                           .json(response);
                    }, function (error) {
                        res.status(500)
                           .json(error);
                    });
        },
        getProblems: function (req, res) {
            data.problems
                    .all()
                    .then(function (response) {
                        res.status(200)
                           .json(response);
                    }, function (error) {
                        res.status(500)
                           .json(error);
                    });
        }
    };
} ());