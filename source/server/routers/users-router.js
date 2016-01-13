'use strict';

let router = require('express').Router(),
    data = require('../data/data');
    
let usersController = require('../controllers/users-controller')(data),
    auth = require('../config/auth');
    
// TODO: refactor those routes

router.get('/api/users', usersController.all)
    .get('/api/users/details', auth.isAuthenticated, usersController.byUsername)
    .get('/api/users/rankings', usersController.findByRank)
    .post('/api/users', usersController.registerUser)
    .get('/users', auth.isInRole('admin'), usersController.allJson)
    .post('/login', auth.login)
    .post('/logout', auth.logout)
    .get('/sign-up', usersController.getSignUp)
    .get('/sign-up-success', usersController.getSignUpSuccess)
    .get('/unauthorized', usersController.getUnauthorized);


module.exports = function (server) {
    server.use('/', router);
};
