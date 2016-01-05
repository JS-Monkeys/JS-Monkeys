(function () {
    'use strict';
    
    let data = require('../data/data');
    
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
        }
    };
} ());