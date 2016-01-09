<<<<<<< HEAD
(function () {
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
      min: 5
    },
    email: {
      type: String,
      unique: true,
      required: true,
      dropDups: true
    },
    salt: {
      type: String,
      required: true
    },
    passHash: {
      type: String,
      required: true
=======
'use strict';

let mongoose = require('mongoose'),
    encryption = require('../../utils/encryption');

let userSchema = new mongoose.Schema({
    // identity properties
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
>>>>>>> master
    },
    roles: [String],
    // other properties
    points: {
<<<<<<< HEAD
      type: Number,
      default: 0,
      min: 0
    },
    submissionIds: [String]
  });

  // TODO: May need to use this:
  // userSchema.set('autoIndex', process.env.NODE_ENV != 'production');

  userSchema.method({
    authenticate: function authenticateUser(password) {
      return encryption.hashPassword(this.salt, password) === this.passHash;
    }
  });

  mongoose.model('User', userSchema);
}());
=======
        type: Number,
        default: 0,
        min: 0
    },
    submissionIds: [String]
});

userSchema.method({
    authenticate: function authenticateUser(password) {
        return encryption.hashPassword(this.salt, password) === this.passHash;
    }
});

mongoose.model('User', userSchema);
>>>>>>> master
