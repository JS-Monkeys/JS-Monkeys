'use strict';

let router = require('express').Router(),
    problemsController = require('../controllers/problems-controller'),
    auth = require('../config/auth');
    
// TODO: refactor those routes
router.get('/:name', problemsController.getDescription)
      .post('/', problemsController.createProblem);

module.exports = function (server) {
    server.use('/problems', router);
}