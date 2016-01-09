'use strict';

// TODO: remove development functions
module.exports = function (data) {
    return {

        homePage: function (req, res) {

            console.log("Home cotrl")
            console.log(req.menuResolver);

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
        }
    };

}