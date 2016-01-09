'use strict';

let router = require('express').Router(),
  homeController = require('../controllers/home-controller'),
  auth = require('../config/auth'),
  path = require('path');

router.get('/favicon.ico', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../../public/assets/favicon.ico'))
});

router.get('/', homeController.homePage)
  .get('/private', auth.isAuthenticated, homeController.homePrivate);

router.get('/:partial', function (req, res) {

  console.log(req.user);

  let options = {
    isAuthenticated: req.isAuthenticated(),
    user: req.user
  };

  res.render('../views/users/' + req.params.partial, options);
});

module.exports = function (server) {
  server.use('/', router);
};
