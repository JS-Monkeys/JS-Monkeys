(function () {
    'use strict';

    let uploading = require('../utils/uploading');
    
    // TODO: remove development functions
    module.exports = {
        uploadPage: function (req, res) {
            res.render('admin', {});
        },
        uploadFile: function (req, res) {
            console.log('gosho');
            req.pipe(req.busboy);

            req.busboy.on('file', function (fieldname, file, filename) {
                uploading.saveFile(file, 'testtest', filename);
            });

            req.busboy.on('finish', function () {
                res.send('<h1>Success!</h1>');
            });
        },
        homePrivate: function (req, res) {
            res.send('<h1>Authorized!</h1>');
        }
    };
} ());