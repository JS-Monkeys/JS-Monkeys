(function () {
    'use strict';

    let mongoose = require('mongoose');

    module.exports = function (connectionString) {
        
        mongoose.connect(connectionString);
        let db = mongoose.connection;
        
        // load models
        require('./models/model-loader');
        
        // log events
        db.once('open', function (err) {
            if (err) {
                console.log('Database could not be opened: ' + err);
                return;
            }

            console.log('Database up and running...')
        });

        db.on('error', function (err) {
            console.log('Database error: ' + err);
        });

    };
} ());