(function () {
    'use strict';
    
    let router = require('express').Router(),
        usersController = require('../controllers/users-controller');
    
    router.get('/', usersController.all)
          .post('/', usersController.registerUser);
    
    module.exports = function (server) {
        server.use('/api/users', router);
    }
} ());