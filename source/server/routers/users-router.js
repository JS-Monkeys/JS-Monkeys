(function () {
  'use strict';

  let router = require('express').Router(),
    usersController = require('../controllers/users-controller'),
    auth = require('../config/auth');

  // TODO: refactor those routes
  router.get('/api/users', usersController.all)
    .post('/api/users', usersController.registerUser)
    .get('/register', usersController.getRegister)
    .post('/register', usersController.postRegister)
    .get('/login', auth.login)
    .post('/login', auth.login)
    .post('/logout', auth.logout);

  module.exports = function (server) {
    server.use('/', router);
  }
}());