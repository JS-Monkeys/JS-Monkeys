'use strict';

let router = require('express').Router(),
    usersController = require('../controllers/users-controller')(require('../data/data')),
    auth = require('../config/auth');
    
// TODO: refactor those routes

router.get('/api/users', usersController.all)
    .get('/api/users/details',auth.isAuthenticated, usersController.byUsername)
    .get('/api/users/rankings', usersController.findByRank)
    .post('/api/users', usersController.registerUser)
    .get('/users',auth.isInRole('admin'), usersController.allJson)
    .post('/login', auth.login)
    .post('/logout', auth.logout);

module.exports = function (server) {
    server.use('/', router);
};

