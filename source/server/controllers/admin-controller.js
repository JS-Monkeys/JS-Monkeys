'use strict';

let uploading = require('../utils/uploading');
    
// TODO: remove development functions
module.exports = function (data) {
    return {
        uploadPage: function (req, res) {
            res.render('admin', {});
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
}