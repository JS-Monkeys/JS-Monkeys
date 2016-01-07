(function () {
    'use strict';

    let vm = require('vm');

    let sandbox = {
        console: {
            log: function (arg) {
                process.stdout.write(arg);
            }
        },
        require: null
    };
    
    // time limit
    let options = {
        timeout: 1000
    };

    process.stdin.on('data', function (code) {
        
        // prevent function args(and other) shenanigans
        code = "'use strict'\n" + (code || '');
        
        try {
            vm.runInNewContext(code, sandbox, options);
        } catch (error) {
            process.stdout.write(JSON.stringify(error) + '\nno more gosho');
        }
    });
} ());