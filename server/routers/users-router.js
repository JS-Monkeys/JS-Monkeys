(function () {
    'use strict';
    
    let router = require('express').Router(),
        usersController = require('../controllers/users-controller'),
        auth = require('../config/auth');
    
    // TODO: refactor those routes
    router.get('/', usersController.all)
          .post('/', usersController.registerUser)
          .post('/login', auth.login)
          .post('/logout', auth.logout);
    
    module.exports = function (server) {
        server.use('/api/users', router);
    }
} ());