(function () {
    'use strict';
    
    let router = require('express').Router(),
        adminController = require('../controllers/admin-controller');
    
    // TODO: auth middleware
    router.get('/upload', adminController.uploadPage)
          .post('/upload', adminController.uploadFile);
    
    module.exports = function (server) {
        server.use('/admin', router);
    }
} ());