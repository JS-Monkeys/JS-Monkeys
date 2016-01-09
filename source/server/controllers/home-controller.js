'use strict';

let data = require('../data/data');

// TODO: remove development functions
module.exports = {
    homePage: function (req, res) {

        data.contests.all()
            .then(function (response) {
                let options = {
                    isAuthenticated: req.isAuthenticated(),
                    user: req.user,
                    contests: response
                };
                // console.log(response);
                res.render('home/home', options);
            }, function (error) {
                res.json(error);
            });


    },
    homePrivate: function (req, res) {
        res.send('<h1>Authorized!</h1>');
    }
};
