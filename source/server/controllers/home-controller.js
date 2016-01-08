'use strict';
    
// TODO: remove development functions
module.exports = {
    homePage: function (req, res) {
        res.render('home', {});
    },
    homePrivate: function (req, res) {
        res.send('<h1>Authorized!</h1>');
    }
};