(function () {
    'use strict';

    let express = require('express'),
        server = express();
    
    let goodJs = "console.log('i am a good javascript');",
        // code that attempts to access the file system in some way
        badJs = "console.log('i am a bad javascript and i can use your require' + require('fs'));",
        veryBadJs = "while(1){ console.log('gosho'); };"; // attemps to freeze the server

    let process = require('child_process');
    
    let child = process.spawn('node', ['js-executor.js']);
        child.stdin.write(veryBadJs);
        child.stdout.on('data', d => console.log(d.toString()));
    
    let counter = 0;
    
    // sample route to prove that server is not freezed by the execution of the veryBadJs
    server.get('/', function (req, res) {
        res.json('figrata sme ' + counter++);
    });
    
    server.listen(1234, () => console.log('Server running on port 1234'));
} ());