'use strict';

// TODO: remove development functions
module.exports = function (data) {
    return {
        homePage: function (req, res) {
            res.render('home/home', req);
        },
        homePrivate: function (req, res) {
            res.send('<h1>Authorized!</h1>');
        }
    };

}