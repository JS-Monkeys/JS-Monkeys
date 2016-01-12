'use strict';

let mongoose = require('mongoose'),
    problemSchema = require('./problem-schema');

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