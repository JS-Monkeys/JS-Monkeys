'use strict';

let router = require('express').Router(),
    usersController = require('../controllers/users-controller')(require('../data/data')),
    auth = require('../config/auth');
    
// TODO: refactor those routes
router.get('/api/users', usersController.all)
    .get('/api/users/rankings', usersController.findByRank)
    .post('/api/users', usersController.registerUser)
    .post('/login', auth.login)
    .post('/logout', auth.logout);

router.get('/:partial', function (req, res) {
    res.render('../views/account/' + req.params.partial, req);
});

module.exports = function (server) {
    server.use('/', router);
};

