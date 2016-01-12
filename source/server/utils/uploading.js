'use strict';

let fs = require('fs'),
    path = require('path'),
    filesDir = path.join(__dirname, '../problems/');
    
function streamToString(stream, cb) {
  const chunks = [];
  stream.on('data', (chunk) => {
    chunks.push(chunk);
  });
  stream.on('end', () => {
    cb(chunks.join(''));
  });
}

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
    },
    overwriteFile: function (file, path, fileName) {
        console.log('overwrite called');
        if (!fs.existsSync(filesDir + path)) {
            return;
            
        }
        
        streamToString(file, function (content) {
            fs.writeFile(filesDir + `${path}\\${fileName}`, content, 'utf-8', err => console.log(err));
        });
    }
};