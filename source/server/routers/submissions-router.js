'use strict';

let router = require('express').Router(),
    submissionsController = require('../controllers/submissions-controller')(require('../data/data')),
    auth = require('../config/auth');

// TODO: refactor those routes
router
    .post('/',  auth.isAuthenticated,submissionsController.makeSubmission)
    .get('/', auth.isInRole('admin'),submissionsController.getSubmissions)
    .get('/:id', submissionsController.getById);

module.exports = function (server) {
    server.use('/submissions', router);
};