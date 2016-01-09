'use strict';

let data = require('../data/data');

module.exports = {
    all: function (req, res) {
        data.contests.all().then(contests => res.json(contests), error => res.json(error));
    },
    byName: function (req, res) {
        data.contests.byName(req.params.name).then(contest => res.json(contest), error => res.json(error));
    }
};