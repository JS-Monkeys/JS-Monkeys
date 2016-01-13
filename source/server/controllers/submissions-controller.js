'use strict';

// let evaluateSubmission = require('../utils/js-execution/submission-evaluator'),
//   moment = require('moment');

module.exports = function (data, evaluateSubmission, dateFormatter) {
    return {
        makeSubmission: function (req, res) {

            let newSubmission = {
                contest: req.body.contest,
                task: req.params.name,
                code: req.body.code,
                user: {
                    username: req.user.username,
                    id: req.user._id
                }
            };

            if (!newSubmission.contest || !newSubmission.task) {
                res.status(400)
                    .json('invalid submission');
            }

            evaluateSubmission(newSubmission).then(function (response) {
                res.status(200)
                    .json(response);
            }, function (error) {
                res.status(400)
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
        },
        getById: function (req, res) {
            let id = req.params.id || "";

            data.submissions.findById(id)
                .then(function (response) {
                    res.status(200)
                        .json(response);
                }, function (error) {
                    res.status(404)
                        .render('not-found', {});
                });
        },
        userSubmissions: function (req, res) {

            console.log("gertting subs");

            let query = {
                'user.username': req.user.username,
                'problem.name': req.params.problem
            };

            console.log(query);

            let sort = {
                sort: {
                    madeOn: -1
                }
            };

            data.submissions.findSubmission(query, sort)
                .then(function (subs) {
                    let formated = subs.map(function (s) {
                        return {
                            madeOn: dateFormatter(s.madeOn).startOf("hour").fromNow(),
                            points: s.points,
                            id: s._id
                        }
                    });

                    let options = {
                        menuResolver: req.menuResolver,
                        submissions: formated
                    };

                    console.log(options);

                    res.status(200)
                        .render('submissions/submissions-by-problem-single', options);
                }, function (error) {
                    res.status(404).render('not-found', {});
                });
        }
    };
};