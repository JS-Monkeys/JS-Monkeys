(function () {
    'use strict';

    let mongoose = require('mongoose');

    let problemSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        uploadedOn: {
            type: Date,
            default: new Date()
        },
        points: {
            type: Number,
            require: true,
            min: 0
        },
        submissionIds: [String]
    });

    mongoose.model('Problem', problemSchema);
} ());