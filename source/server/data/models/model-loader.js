'use strict';
let path = require('path'),
    fs = require('fs');
fs
    .readdirSync(path.join(__dirname, './'))
    .filter(fn => fn !== 'model-loader.js' && fn.indexOf('-model.js') !== -1)
    .forEach(fn => require(`./${fn}`));