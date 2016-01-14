'use strict';

let mongoose = require('mongoose');

let courseSchema = new mongoose.Schema({
    name: {
        type: String
    },
    videoUrl: {
        type: String
    },
    madeOn: {
        type: Date,
        default: new Date()
    }
});

mongoose.model('Course', courseSchema);