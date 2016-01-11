'use strict';

let router = require('express').Router(),
    submissionsController = require('../controllers/submissions-controller')(require('../data/data')),
    auth = require('../config/auth');
    
// TODO: refactor those routes
router
    .post('/', submissionsController.makeSubmission)
    .get('/', submissionsController.getSubmissions);

module.exports = function (server) {
    server.use('/submissions', router);
}