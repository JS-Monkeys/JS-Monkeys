(function () {
    'use strict';
    
    // applies every router in the directory to the server
    module.exports = function routeConfig(server) {
        require('fs')
            .readdirSync('./server/routers')
            .filter(fn => fn !== 'route-config.js')
            .forEach(fn => require(`./${fn}`)(server));
    }
} ());