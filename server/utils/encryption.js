(function () {
    'use strict';
    
    let cryptoJS = require('crypto');
    
    module.exports = {
        generateSalt: function () {
            return cryptoJS.randomBytes(128).toString('base64');
        },
        hashPassword: function (salt, password) {
            let hmac = cryptoJS.createHmac('sha1', salt);
            return hmac.update(password).digest('hex');
        }
    };
} ());