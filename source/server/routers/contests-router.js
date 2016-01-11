'use strict';

let router = require('express').Router(),
    auth = require('../config/auth'),
  contestsController = require('../controllers/contests-controller')(require('../data/data'));
let submissionsController = require('../controllers/submissions-controller')(require('../data/data'));
router.get('/:name', contestsController.byName)
      .get('/:name/addproblem', auth.isInRole('admin'), contestsController.addProblemPage)
      .post('/:name/addproblem', auth.isInRole('admin'), contestsController.addProblemToContest)
      .post('/:name', submissionsController.makeSubmission)
        .get('/', contestsController.all)
        .post('/', contestsController.create)
        .post('/add', contestsController.createJsonResponse);


module.exports = function (server) {
  server.use('/contests', router);
};