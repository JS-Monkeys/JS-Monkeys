'use strict';

let router = require('express').Router();

router.get('/unauthorized', function (req, res) {
        res.render('shared/unauthorized', {
            menuResolver: req.menuResolver
        });
    })
    .get('/not-found', function (req, res) {
        res.render('shared/not-found', {
            menuResolver: req.menuResolver
        });
    })
    .get('/about', function (req, res) {
        res.render('shared/about', {
            menuResolver: req.menuResolver
        });
    });

module.exports = function (server) {
    server.use('/', router);
};
