(function () {
    'use strict';

    let vm = require('vm'),
        fs = require('fs'),
        output = [],
        results = [],
        options = {};

    let sandbox = {
        console: {
            log: function (arg) {
                // console.log(arg);
                output.push('e prase');
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

                    fs.readFile(`./server/problems/${submission.task}/test.out.${index}.txt`, function (err2, test) {
                        if (err2) {
                            console.log(err2);
                            return;
                        }

                        results[index] = (output[index] === test.toString());

                        if (index === (submission.taskInfo.count - 1)) {
                            process.stdout.write(results.toString());
                        }
                    });

                } catch (error) {
                    results[index] = 'exception';
                    process.stdout.write(error.toString());
                }
            });
        }
    });
} ());
