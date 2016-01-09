'use strict';

require('fs')
    .readdirSync('./server/data/models')
    .filter(fn => fn !== 'model-loader.js')
    .forEach(fn => require(`./${fn}`));