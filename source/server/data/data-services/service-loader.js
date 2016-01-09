'use strict';

module.exports = function (dbServiceProvider) {
    require('fs')
        .readdirSync('./server/data/data-services')
        .filter(fn => fn !== 'service-loader.js')
        .forEach(fn => {
            // load all services in directory in an object
            let service = require(`./${fn}`);
            dbServiceProvider[service.name] = service.services;
        });
}