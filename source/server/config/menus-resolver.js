'use strict';

module.exports = function (server) {

  // insert middleware
  server.use(function (req, res, next) {
    req.menuResolver = {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    };

    next();
  });
};