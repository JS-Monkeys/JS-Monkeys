(function () {
    'use strict';

    let router = require('express').Router(),
        submissionsController = require('../controllers/submissions-controller'),
        auth = require('../config/auth');
    
    // TODO: refactor those routes
    router.post('/', auth.isAuthenticated, submissionsController.makeSubmission);

    module.exports = function (server) {
        server.use('/problems', router);
    }
} ());