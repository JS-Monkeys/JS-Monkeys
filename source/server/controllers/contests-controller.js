'use strict';

let uploading = require('../utils/uploading'),
    marked = require('marked');

module.exports = function (data) {
    return {
        all: function (req, res) {
            data.contests.all()
                .then(contests => res.json(contests), error => res.json(error));
        },
        byName: function (req, res) {
            data.contests.byName(req.params.name)
                .then(function (contest) {
                    res.render('contest/contest', {
                        menuResolver: req.menuResolver,
                        currentContest: contest,
                        marked: marked
                    });
                }, error => res.json(error));
        },
        addProblemPage: function (req, res) {
            res.render('contest/add-problem', {
                currentContest: { name: req.params.name },
                menuResolver: req.menuResolver
            });
        },
        addProblemToContest: function (req, res) {

            let problem = {
                name: req.body.name,
                description: req.body.description,
                points: req.body.points,
                constraints: { timeout: req.body.timeout }
            };

            data.contests.addProblemToContest(req.params.name, problem)
                .then(function (dbRes) {
                    res.status(201)
                    .redirect('/contests/' + req.params.name);
                    
                    uploading.createDir('', dbRes.name);
                },
                    err => res.status(500).json(err));
        },
        create: function (req, res) {
            data.contests.create(req.body)
                .then(contest => res.status(201).redirect('/contests/' + contest),
                    error => res.status(500).json(error));
        },
        createJsonResponse: function (req, res) {
            data.contests.create(req.body)
                .then(contest => res.json({ contest: contest }),
                    error => res.json(error));
        }
    };
};