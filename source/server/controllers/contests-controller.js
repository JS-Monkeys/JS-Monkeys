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
                        marked: marked
                    });
                }, error => res.json(error));


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