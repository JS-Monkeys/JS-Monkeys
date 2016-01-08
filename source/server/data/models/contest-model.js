(function () {
    'use strict';

    let mongoose = require('mongoose');

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
        // TODO: put tasks model here(performance improvement)
        tasks: [String],
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
} ());