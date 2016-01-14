'use strict';

let mongoose = require('mongoose');

module.exports = new mongoose.Schema({
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
        required: true,
        min: 0
    },
    constraints: {
        timeout: {
            type: Number,
            required: true,
            min: 500
        }
    },
    description: {
        type: String
    },
    testCount: {
        type: Number,
        default: 2
    },
    submissionIds: [String]
});

