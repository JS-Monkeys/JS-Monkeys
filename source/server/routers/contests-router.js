'use strict';

let router = require('express').Router(),
  auth = require('../config/auth'),
  contestsController = require('../controllers/contests-controller')(require('../data/data')),
  submissionsController = require('../controllers/submissions-controller')(require('../data/data'));
router
//.post('/add', contestsController.createJsonResponse)
  .get('/:name', contestsController.byName)
  .post('/:name', submissionsController.makeSubmission)
  .get('/:name/addproblem', auth.isInRole('admin'), contestsController.addProblemPage)
  .post('/:name/addproblem', auth.isInRole('admin'), contestsController.addProblemToContest)
  .get('/:name/:problem', auth.isAuthenticated, submissionsController.userSubmissions)
  .get('/', contestsController.all)
  .post('/', contestsController.create);


module.exports = function (server) {
  server.use('/contests', router);
};