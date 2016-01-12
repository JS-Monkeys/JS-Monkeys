'use strict';

require('fs')
    .readdirSync('./server/data/models')
    .filter(fn => fn !== 'model-loader.js' && fn.indexOf('-model.js') !== -1)
    .forEach(fn => require(`./${fn}`));