'use strict';

// ask if the tests are ready
function startFinishIntervalChecks(resultArray, elementCount, timeout, output) {
    let intervalId = setInterval(function () {
        if (resultArray.length === elementCount) {
            process.stdout.write(resultArray.toString());
            clearInterval(intervalId);
            // process.stderr.write(JSON.stringify(output));
            // process.stderr.write(JSON.stringify(tests));
        }
    }, timeout);
}

const LINE_ENDINGS = '\r\n';

let vm = require('vm'),
    fs = require('fs'),
    path = require('path'),
    results = [],
    tests = [],
    options = {};

process.stdin.on('data', function (submission) {
    submission = JSON.parse(submission);

    let code = submission.code;

    // prevent function args(and other) shenanigans
    code = "'use strict';\n" + (code || '');
    options.timeout = submission.taskInfo.constraints.timeout || 1000;

    let testCount = fs.readdirSync(path.join(__dirname, `../../problems/${submission.task}`)).length / 2;
    
    for (let i = 0; i < testCount; i++) {

        let index = i + 0;
        let output = [];
        
        fs.readFile(path.join(__dirname, `../../problems/${submission.task}/test.in.${index}.txt`), function (readInputError, file) {
            if (readInputError) {
                process.stderr.write(readInputError.toString());
                return;
            }

            try {
                
                
                
                let sandbox = {
                        console: {
                            log: function (arg) {
                                if(arg === null || arg === undefined) {
                                    output.push(arg + '');
                                } else {
                                    output.push(arg.toString());
                                }
                                
                            }
                        },
                        args: file.toString().split(LINE_ENDINGS)
                    };
                    
                // process.stderr.write('file contents');
                // process.stderr.write(file.toString());
                // process.stderr.write('sandbox args:');
                // process.stderr.write(sandbox.args.toString());
                vm.runInNewContext(code, sandbox, options);
                
                fs.readFile(path.join(__dirname, `../../problems/${submission.task}/test.out.${index}.txt`), function (readOutputError, test) {
                    if (readOutputError) {
                        process.stderr.write(readOutputError.toString());
                        return;
                    }
                    
                    // store test results
                    process.stderr.write(JSON.stringify(test.toString()));
                    tests.push(test.toString());
                    results[index] = (output.join(LINE_ENDINGS) === test.toString());
                    // process.stderr.write('output:');
                    // process.stderr.write(output[index]);
                    // output results to master process when finished
                    if (index === (testCount - 1)) {
                        startFinishIntervalChecks(results, testCount, 500, output);
                    }
                });

            } catch (error) {
                // in case of error, the results is an error
                process.stderr.write(error.toString());
                results[index] = 'exception';
                //process.stdout.write(error.toString());
                startFinishIntervalChecks(results, testCount, 500, output);
            }
        });
    }


});