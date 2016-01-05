(function () {
    'use strict';
    
    let router = require('express').Router(),
        homeController = require('../controllers/home-controller');
    
    router.get('/', homeController.homePage);
    
    module.exports = function (server) {
        server.use('/', router);
    }
} ());