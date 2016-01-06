(function () {
    'use strict';
    
    let router = require('express').Router(),
        auth = require('../config/auth'),
        adminController = require('../controllers/admin-controller');
    
    // TODO: auth middleware
    router.get('/upload', auth.isInRole('admin'), adminController.uploadPage)
          .post('/upload', auth.isInRole('admin'),adminController.uploadFile);
    
    module.exports = function (server) {
        server.use('/admin', router);
    }
} ());