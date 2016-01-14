'use strict';

let router = require('express').Router(),
    auth = require('../config/auth');

// TODO: auth middleware
router
    .get('/add-contest', auth.isInRole('admin'), function (req, res) {
        let options = {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        };
        res.render('../views/contest/add', req);
    });

module.exports = function (server) {
    server.use('/admin', router);
};