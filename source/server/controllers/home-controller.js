'use strict';

// TODO: remove development functions
module.exports = function (data) {
    return {

        homePage: function (req, res) {

            //data.contests.all()
            //  .then(function (response) {
            //    let options = {
            //      menuResolver: req.menuResolver,
            //      contests: response
            //    };
            // console.log(response);
            res.render('home/home', req);
            //}, function (error) {
            //  res.json(error);
            //});
        },
        homePrivate: function (req, res) {
            res.send('<h1>Authorized!</h1>');
        },
        aboutPage:function (req, res) {
            res.render('shared/about', req);
        }
    };
};