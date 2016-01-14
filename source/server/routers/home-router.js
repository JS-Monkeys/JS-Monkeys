'use strict';

let router = require('express').Router(),
  homeController = require('../controllers/home-controller')(require('../data/data')),
  auth = require('../config/auth'),
  path = require('path');

router.get('/favicon.ico', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/../../public/assets/favicon.ico'))
});

router.get('/', homeController.homePage)
  .get('/about', homeController.aboutPage)
  .get('/private', auth.isAuthenticated, homeController.homePrivate);


module.exports = function (server) {
  server.use('/', router);
};
