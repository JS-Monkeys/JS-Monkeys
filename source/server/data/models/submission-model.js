(function () {
    'use strict';

    let mongoose = require('mongoose');

    let submissionSchema = new mongoose.Schema({
        problemId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
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
} ());