'use strict';

let mongoose = require('mongoose');

let submissionSchema = new mongoose.Schema({
    problem: {
        name: {
            type: String,
            required: true
        },
        id: String
    },
    user: {
        username: {
            type: String,
            required: true
        },
        id: String
    },
    code: {
        type: String
    },
    madeOn: {
        type: Date,
        default: new Date()
    },
    points: {
        type: Number,
        required: true,
        min: 0
    }
});

mongoose.model('Submission', submissionSchema);