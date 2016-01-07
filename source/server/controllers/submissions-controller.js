(function () {
    'use strict';

    let se = require('../utils/js-execution/submission-evaluator'),
        data = require('../data/data');

    module.exports = {
        makeSubmission: function (req, res) {
            se({
                task: req.body.submission.name,
                code: req.body.submission.code,
                user: {
                    username: req.user.username,
                    id: req.user._id
                }
            }).then(function (response) {
                res.status(200)
                    .json(response);
            }, function (error) {
                res.status(500)
                    .json(error);
            });
        },
        getSubmissions: function (req, res) {
            data.submissions.all()
                .then(function (response) {
                    res.status(200)
                        .json(response);
                }, function (error) {
                    res.status(500)
                        .json(error);
                });
        }
    }
} ());