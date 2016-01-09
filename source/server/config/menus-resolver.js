'use strict';
let data = require('../data/data');

module.exports = function (server) {

  //  insert middleware
   server.use(function (req, res, next) {
     req.menuResolver = {
       isAuthenticated: req.isAuthenticated(),
       user: req.user,
       contests: data.cache.contests
     };

     next();
   });
};