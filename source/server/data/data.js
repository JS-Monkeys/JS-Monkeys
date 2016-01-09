'use strict';
    
// initiliaze a data object with all existing services
function initData(data) {
    require('./data-services/service-loader')(data);
    return data;
}

module.exports = initData({});   