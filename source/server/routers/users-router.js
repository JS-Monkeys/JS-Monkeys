'use strict';

let router = require('express').Router(),
    usersController = require('../controllers/users-controller'),
    auth = require('../config/auth');
    
// TODO: refactor those routes
router.get('/api/users', usersController.all)
    .post('/api/users', usersController.registerUser)
    .post('/login', auth.login)
    .post('/logout', auth.logout);

module.exports = function (server) {
    server.use('/', router);
}