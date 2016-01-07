(function () {
    'use strict';
    
    let router = require('express').Router(),
        auth = require('../config/auth'),
        adminController = require('../controllers/admin-controller');
    
    // TODO: auth middleware
    router.get('/upload', auth.isInRole('admin'), adminController.uploadPage)
          .post('/upload', auth.isInRole('admin'),adminController.uploadFile)
          // TODO: get problems must also be a public route
          .get('/problems', auth.isInRole('admin'), adminController.getProblems)
          .post('/problems', auth.isInRole('admin'), adminController.addProblem);
    
    module.exports = function (server) {
        server.use('/admin', router);
    }
} ());