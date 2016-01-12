'use strict';

let router = require('express').Router(),
    problemsController = require('../controllers/problems-controller')(require('../data/data')),
    auth = require('../config/auth');
    
// TODO: refactor those routes
router
      .get('/:problem/tests', auth.isInRole('admin'), problemsController.testsPage)
      .post('/:problem/tests', auth.isInRole('admin'), problemsController.uploadTests)
      .post('/:problem/tests/update', auth.isInRole('admin'), problemsController.updateTests)
      .post('/', problemsController.createProblem)
      .all('/all', problemsController.problemsAsJson);

module.exports = function (server) {
    server.use('/problems', router);
}