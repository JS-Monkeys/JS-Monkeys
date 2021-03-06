'use strict';
let data = require('../data/data');

module.exports = function (server) {

  //  insert middleware
  server.use(function (req, res, next) {
    req.menuResolver = {
      isAuthenticated: req.isAuthenticated(),
      user: req.user || {},
      contests: data.cache.contests || [],
      isAdmin: req.user && req.user.roles.indexOf('admin') !== -1,
      courses: data.cache.courses || []
    };

    next();
  });
};