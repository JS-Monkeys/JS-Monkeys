'use strict';

let path = require('path');
// applies every router in the directory to the server
module.exports = function routeConfig(server) {
    require('fs')
        .readdirSync(path.join(__dirname, './'))
        .filter(fn => fn !== 'route-loader.js')
        .forEach(fn => require(`./${fn}`)(server));
}