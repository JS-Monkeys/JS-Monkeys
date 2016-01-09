'use strict';

let data = require('../data/data');

module.exports = {
    all: function (req, res) {
        data.contests.all().then(contests => res.json(contests), error => res.json(error));
    },
    byName: function (req, res) {
        data.contests.byName(req.params.name).then(contest => res.render('contest/contest', contest), error => res.json(error));
    },
    create: function (req,res) {
        data.contests.create(req.body).then(contest => res.redirect(201, '/contests/' + contest),
                                            error => res.json(error));
    }
};