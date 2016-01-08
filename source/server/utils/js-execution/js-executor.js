'use strict';

let vm = require('vm'),
    fs = require('fs'),
    output = [],
    results = [],
    options = {};

let sandbox = {
    console: {
        log: function (arg) {
            output.push(arg.toString());
        }
    }
};

process.stdin.on('data', function (submission) {
    submission = JSON.parse(submission);

    let code = submission.code;
        
    // prevent function args(and other) shenanigans
    code = "'use strict';\n" + (code || '');
    options.timeout = submission.taskInfo.constraints.timeout || 1000;

    for (var i = 0; i < submission.taskInfo.count; i++) {

        let index = i;

        fs.readFile(`./server/problems/${submission.task}/test.in.${index}.txt`, function (readInputError, file) {
            if (readInputError) {
                console.log('error with reading tests: ' + readInputError);
                return;
            }

            try {
                sandbox.args = [file.toString()];

                vm.runInNewContext(code, sandbox, options);

                fs.readFile(`./server/problems/${submission.task}/test.out.${index}.txt`, function (readOutputError, test) {
                    if (readOutputError) {
                        console.log(readOutputError);
                        return;
                    }
                        
                    // store test results
                    results[index] = (output[index] === test.toString());
                        
                    // output results to master process when finished
                    if (index === (submission.taskInfo.count - 1)) {
                        process.stdout.write(results.toString());
                    }
                });

            } catch (error) {
                // in case of error, the results is an error
                results[index] = 'exception';
                process.stdout.write(error.toString());
            }
        });
    }
});