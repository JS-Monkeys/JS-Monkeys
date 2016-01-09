'use strict';

let express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    busboy = require('connect-busboy'),
    server = express(),
    port = process.env.PORT || 2345,
    connectionString = 'mongodb://localhost:27017/jsmonkey';
    
    // i can't think of another place to extract those middlewares
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
        extended: true
    }));
    server.use(cookieParser());

// file upload middleware
server.use(busboy({ immediate: false }));
    
// db config
require('./config/db-config')(connectionString);
    
// passport config
require('./config/passport-config')(server);

// static requests config
server.use(express.static(__dirname + '/../public'));

// configure view engine
server.set('view engine', 'jade');
server.set('views', __dirname + '/views');
// md config for view engine
require('./config/marked-config');
    
// configure routes
require('./routers/route-loader')(server);

server.listen(port, () => console.log(`Server running on ${port}`));