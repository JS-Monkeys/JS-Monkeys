'use strict';

let router = require('express').Router(),
    marked = require('marked'),
    moment = require('moment'),
    auth = require('../config/auth'),
    data = require('../data/data'),
    uploading = require('../utils/uploading'),
    evaluateSubmission = require('../utils/js-execution/submission-evaluator');

let contestsController = require('../controllers/contests-controller')(data, uploading, marked),
    submissionsController = require('../controllers/submissions-controller')(data, evaluateSubmission, moment);

router
    .get('/:name', contestsController.byName)
    .post('/:name', auth.isAuthenticated, submissionsController.makeSubmission)
    .get('/:name/addproblem', auth.isInRole('admin'), contestsController.addProblemPage)
    .post('/:name/addproblem', auth.isInRole('admin'), contestsController.addProblemToContest)
    .get('/:name/:problem', auth.isAuthenticated, submissionsController.userSubmissions)
    .get('/', contestsController.all)
    .post('/', auth.isInRole('admin'), contestsController.create);

module.exports = function (server) {
    server.use('/contests', router);
};