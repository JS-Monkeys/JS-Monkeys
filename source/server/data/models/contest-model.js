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

mongoose.model('Problem', problemSchema);

let Problem = mongoose.model('Problem');

let contestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    startDate: {
        type: Date,
        default: new Date()
    },
    endDate: {
        type: Date,
        default: new Date()
    },
    problems: [problemSchema],
    ranking: [{
        participants: {
            name: {
                type: String,
                required: true
            },
            points: {
                type: Number,
                default: 0
            }
        }
    }],
    submissionsIds: [String]
});

mongoose.model('Contest', contestSchema);