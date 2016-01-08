(function () {
  'use strict';

  let data = require('../data/data');

  let CONTROLLER_NAME = 'users';

  module.exports = {
    registerUser: function (req, res) {
      data.users
        .createUser(req.body)
        .then(function (response) {
          res.json(response);
        }, function (error) {
          res.json(error);
        });
    },
    all: function (req, res) {
      data.users
        .all()
        .then(function (response) {
          res.json(response);
        }, function (error) {
          res.json(error);
        });
    },
    getRegister: function (req, res, next) {
      res.render(CONTROLLER_NAME + '/register')
    },
    postRegister: function (req, res) {
      console.log("in reg");
      console.log(req.body);
      console.log("in reg");
      data.users
        .createUser(req.body)
        .then(function (user) {
          req.logIn(user, function(err) {
            if (err) {
              res.status(400);
              return res.send({reason: err.toString()}); // TODO
            }
            else {
              res.redirect('/');
            }
          });
        }, function (error) {
          res.json(error);
        });
    }
  };
}());