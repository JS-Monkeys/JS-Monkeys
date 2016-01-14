'use strict';

let router = require('express').Router(),
    moment = require('moment'),
    data = require('../data/data'),
    evaluateSubmission = require('../utils/js-execution/submission-evaluator');

let submissionsController = require('../controllers/submissions-controller')(data, evaluateSubmission, moment),
    auth = require('../config/auth');

// TODO: refactor those routes
router
    .post('/',  auth.isAuthenticated,submissionsController.makeSubmission)
    .get('/', auth.isInRole('admin'),submissionsController.getSubmissions)
    .get('/all', submissionsController.getFilteredSubmissions)
    .get('/:id', submissionsController.renderById)
    .get('/api/:id', submissionsController.getById);

module.exports = function (server) {
    server.use('/submissions', router);
};