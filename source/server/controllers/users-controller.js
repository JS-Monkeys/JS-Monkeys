'use strict';
const TOP_TEN_USERS = 10,
    MIN_RANK = 0,
    MAX_RANK = 100;

module.exports = function (data) {
    return {
        registerUser: function (req, res) {
            data.users
                .createUser(req.body)
                .then(function (response) {
                    res.json(response);
                }, function (error) {
                    res.json(error);
                });
        },
        all: function (req, res) {
            data.users
                .all()
                .then(function (response) {
                    res.json(response);
                }, function (error) {
                    res.json(error);
                });
        },
        findByRank: function (req, res) {
            if (!(req.query.from && req.query.to)) {
                data.users
                    .findByRank(MIN_RANK,MAX_RANK,TOP_TEN_USERS)
                    .then(function (response) {
                        res.render('ranking/ranking',{
                            usersByRank: response,
                            menuResolver: req.menuResolver
                        });
                    });
            } else {
                data.users
                    .findByRank(req.query.from, req.query.to, Number.MAX_SAFE_INTEGER)
                    .then(function (response) {
                        res.render('ranking/ranking-range', {
                            usersByRank: response,
                            menuResolver: req.menuResolver,
                            queryFrom: req.query.from,
                            queryTo: req.query.to
                        });
                        //res.json(response);
                    }, function (error) {
                        res.json(error);
                    });
            }
        }
    };
};