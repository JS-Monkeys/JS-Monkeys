'use strict';

let router = require('express').Router(),
    contestsController = require('../controllers/contests-controller');

    router.get('/:name', contestsController.byName)
          .get('/', contestsController.all)
          .post('/',contestsController.create);
          

module.exports = function (server) {
    server.use('/contests', router);
};