'use strict';

// ask if the tests are ready
function startFinishIntervalChecks(resultArray, elementCount, timeout) {
    let intervalId = setInterval(function () {
        if (resultArray.length === elementCount) {
            process.stdout.write(resultArray.toString());
            clearInterval(intervalId);
        }
    }, timeout);
}

let vm = require('vm'),
    fs = require('fs'),
    path = require('path'),
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

    let testCount = fs.readdirSync(path.join(__dirname, `../../problems/${submission.task}`)).length / 2;
    process.stderr.write(testCount.toString());
    for (let i = 0; i < testCount; i++) {

        let index = i + 0;
        //process.stderr.write('outside' + index.toString());
        fs.readFile(path.join(__dirname, `../../problems/${submission.task}/test.in.${index}.txt`), function (readInputError, file) {
            if (readInputError) {
                process.stderr.write(readInputError.toString());
                return;
            }

            try {
                sandbox.args = [file.toString()];

                vm.runInNewContext(code, sandbox, options);
                process.stderr.write('vm finished');
                fs.readFile(path.join(__dirname, `../../problems/${submission.task}/test.out.${index}.txt`), function (readOutputError, test) {
                    if (readOutputError) {
                        process.stderr.write(readOutputError.toString());
                        return;
                    }
                    process.stderr.write('in output testing' + index.toString());
                    // store test results
                    results[index] = (output[index] === test.toString());
                        
                    // output results to master process when finished
                    if (index === (testCount - 1)) {
                        startFinishIntervalChecks(results, testCount, 500);
                    }
                });

            } catch (error) {
                // in case of error, the results is an error
                process.stderr.write(error.toString());
                results[index] = 'exception';
                //process.stdout.write(error.toString());
                startFinishIntervalChecks(results, testCount, 500);
            }
        });
    }


});