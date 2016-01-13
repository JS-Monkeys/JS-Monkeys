'use strict';

let express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    path = require('path'),
    busboy = require('connect-busboy'),
    server = express(),
    port = process.env.PORT || 2345,
    connectionString = 'mongodb://localhost:27017/jsmonkey',
    mongoLabConnectionString = 'mongodb://Munky:jsgorilla@ds037005.mongolab.com:37005/jsmonkeys';

if (process.env.NODE_ENV === 'production') {
    connectionString = mongoLabConnectionString;
}

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

// menus resolver
require('./config/menus-resolver')(server);

// static requests config
server.use(express.static(path.join(__dirname, '/../public')));

// configure view engine
server.set('view engine', 'jade');
server.set('views', __dirname + '/views');
// md config for view engine
require('./config/marked-config');

// configure routes
require('./routers/route-loader')(server);

server.get('*', function(req, res){
  res.status(404).render('shared/not-found', req);
});

server.listen(port, () => console.log(`Server running on ${port}`));