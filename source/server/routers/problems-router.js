'use strict';

let router = require('express').Router(),
    data = require('../data/data'),
    fs = require('fs'),
    uploading = require('../utils/uploading');

let problemsController = require('../controllers/problems-controller')(data, uploading, fs),
    auth = require('../config/auth');
    
// TODO: refactor those routes
router
    .get('/:problem/tests', auth.isInRole('admin'), problemsController.testsPage)
    .post('/:problem/tests', auth.isInRole('admin'), problemsController.uploadTests)
    .post('/:problem/tests/update', auth.isInRole('admin'), problemsController.updateTests)
    .post('/', auth.isInRole('admin'), problemsController.createProblem)
    .all('/all', auth.isAuthenticated, problemsController.problemsAsJson);

module.exports = function (server) {
    server.use('/problems', router);
};