(function () {
    'use strict';
    
    let router = require('express').Router(),
        homeController = require('../controllers/home-controller'),
        auth = require('../config/auth');
    
    router.get('/', homeController.homePage)
          .get('/private', auth.isAuthenticated, homeController.homePrivate);
    
    module.exports = function (server) {
        server.use('/', router);
    }
} ());