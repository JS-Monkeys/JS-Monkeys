'use strict';

let router = require('express').Router(),
  contestsController = require('../controllers/contests-controller');

router.get('/:name', contestsController.byName)
  .get('/', contestsController.all)
  .post('/', contestsController.create)
  .post('/add', contestsController.createJsonResponse);


module.exports = function (server) {
  server.use('/contests', router);
};