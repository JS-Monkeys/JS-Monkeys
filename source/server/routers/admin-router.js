'use strict';

let router = require('express').Router(),
  auth = require('../config/auth'),
  adminController = require('../controllers/admin-controller')(require('../data/data'));

// TODO: auth middleware
router.get('/upload', auth.isInRole('admin'), adminController.uploadPage)
  .get('/problems', auth.isInRole('admin'), adminController.getProblems)
  .post('/problems', auth.isInRole('admin'), adminController.addProblem)
  .get('/add-contest',auth.isInRole('admin'), function (req, res) {
    let options = {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    };
    res.render('../views/contest/add', req);
  });

module.exports = function (server) {
  server.use('/admin', router);
};