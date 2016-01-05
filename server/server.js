(function () {
    'use strict';
    
    let express = require('express'),
        bodyParser = require('body-parser'),
        server = express(),
        port = process.env.PORT || 2345,
        connectionString = 'mongodb://localhost:27017/jsmonkey';
    
    server.use(bodyParser.json());
    
    // db config
    require('./data/mongoose-config')(connectionString);
    
    // configure view engine
    server.set('view engine', 'jade');
    server.set('views', __dirname + '/views');
    
    // configure routes
    require('./routers/route-config')(server);
    
    server.listen(port, () => console.log(`Server running on ${port}`));
} ());