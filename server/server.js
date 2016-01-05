(function () {
    'use strict';
    
    let express = require('express'),
        server = express(),
        port = process.env.PORT || 2345;
    
    // configure view engine
    server.set('view engine', 'jade');
    server.set('views', __dirname + '/views');
    
    // configure routes
    require('./routers/route-config')(server);
    
    server.listen(port, () => console.log(`Server running on ${port}`));
} ());