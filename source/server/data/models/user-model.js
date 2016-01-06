(function () {
    'use strict';
    
    let mongoose = require('mongoose'),
        encryption = require('../../utils/encryption');
    
    let userSchema = new mongoose.Schema({
        username: {
            type: String,
            require: true,
            min: 5
        },
        salt: {
            type: String,
            required: true
        },
        passHash: {
            type: String,
            required: true
        },
        roles: [String]
    });
    
    userSchema.method({
       authenticate: function authenticateUser(password) {
           return encryption.hashPassword(this.salt, password) === this.passHash;
       }
    });
    
    mongoose.model('User', userSchema);
} ());