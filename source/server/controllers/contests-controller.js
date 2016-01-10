'use strict';

let fs = require('fs'),
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
                        marked: marked,
                        isAdmin: req.user && req.user.roles.indexOf('admin') !== -1
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
            console.log(problem);
            data.contests.addProblemToContest(req.params.name, problem)
                .then(dbRes => res.json(dbRes),
                    err => res.json(err));
        },
        create: function (req, res) {
            data.contests.create(req.body)
                .then(contest => res.redirect(201, '/contests/' + contest),
                    error => res.json(error));
        },
        createJsonResponse: function (req, res) {
            data.contests.create(req.body)
                .then(contest => res.json({ contest: contest }),
                    error => res.json(error));
        }
    };
}