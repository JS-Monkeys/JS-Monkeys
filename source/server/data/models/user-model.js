'use strict';

let mongoose = require('mongoose'),
  encryption = require('../../utils/encryption');

let userSchema = new mongoose.Schema({
  // identity properties
  username: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    min: 5,
    max: 15,
    match: [/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/, 'Invalid username']
  },
  email: {
    type: String,
    unique: true,
    required: true,
    dropDups: true,
    match: [/^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/, 'Invalid email address']
  },
  salt: {
    type: String,
    required: true
  },
  passHash: {
    type: String,
    required: true
  },
  roles: [String],
  // other properties
  points: {
    type: Number,
    default: 0,
    min: 0
  },
  submissionIds: [String]
});

// TODO: May need to use this in production env:
// userSchema.set('autoIndex', process.env.NODE_ENV != 'production');

userSchema.method({
  authenticate: function authenticateUser(password) {
    return encryption.hashPassword(this.salt, password) === this.passHash;
  }
});

mongoose.model('User', userSchema);
