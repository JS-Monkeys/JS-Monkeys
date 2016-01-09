'use strict';

// TODO: remove development functions
module.exports = {
  homePage: function (req, res) {

    let options = {
      isAuthenticated: req.isAuthenticated(),
      user: req.user
    };

    res.render('home/home',options);
  },
  homePrivate: function (req, res) {
    res.send('<h1>Authorized!</h1>');
  }
};
