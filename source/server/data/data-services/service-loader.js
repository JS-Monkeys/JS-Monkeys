'use strict';
let path = require('path'),
    fs = require('fs');
module.exports = function (dbServiceProvider) {
    fs
        .readdirSync(path.join(__dirname, './'))
        .filter(fn => fn !== 'service-loader.js' && fn.indexOf('-services.js') >= 0)
        .forEach(fn => {
            // load all services in directory in an object
            
            if(fn === 'caching.js') {
                throw new Error('aklfsjkf');
            }
            
            let service = require(`./${fn}`);
            dbServiceProvider[service.name] = service.services;
        });
    
    // attach cache
    require('./caching')(dbServiceProvider);
}