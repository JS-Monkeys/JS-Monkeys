'use strict';

let router = require('express').Router(),
  data = require('../data/data');

let coursesController = require('../controllers/courses-controller')(data),
  auth = require('../config/auth');

router.get('/', coursesController.renderAll)
  .get('/add', auth.isInRole('admin'), coursesController.getAddCourse)
  .post('/add', auth.isInRole('admin'), coursesController.add)
  .get('/:name', coursesController.byName);

module.exports = function (server) {
  server.use('/courses', router);
};
