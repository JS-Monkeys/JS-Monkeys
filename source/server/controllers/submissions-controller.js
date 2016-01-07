(function () {
    'use strict';
    
    let se = require('../utils/js-execution/submission-evaluator');
    
    module.exports = {
        makeSubmission: function (req, res) {
            console.log(req.body.submission);
            se({
                taskName: req.body.submission.name,
                code: req.body.submission.code
            })
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