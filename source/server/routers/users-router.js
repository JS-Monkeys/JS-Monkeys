'use strict';

let router = require('express').Router(),
    usersController = require('../controllers/users-controller'),
    auth = require('../config/auth');
    
// TODO: refactor those routes
router.get('/api/users', usersController.all)
    .post('/api/users', usersController.registerUser)
    .post('/login', auth.login)
    .post('/logout', auth.logout);


router.get('/:partial', function (req, res) {

    let options = {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    };

    res.render('../views/account/' + req.params.partial, options);
});

module.exports = function (server) {
    server.use('/', router);
};

