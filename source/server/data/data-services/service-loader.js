'use strict';

module.exports = function (dbServiceProvider) {
    require('fs')
        .readdirSync('./server/data/data-services')
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