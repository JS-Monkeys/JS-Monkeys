'use strict';

let fs = require('fs'),
    path = require('path'),
    filesDir = path.join(__dirname, '../problems/');

module.exports = {
    createDir: function (path, dirName) {
        dirName = dirName || '';
        fs.mkdirSync(filesDir + path + dirName);
    },
    saveFile: function (file, path, fileName) {
        if (!fs.existsSync(filesDir + path)) {
            this.createDir(path);
        }

        let fstream = fs.createWriteStream(filesDir + path + '/' + fileName);
        file.pipe(fstream);
    }
};