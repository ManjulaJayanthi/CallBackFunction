const fs = require('fs');
const path = require('path')

//FILES
const FILE1 = 'file1.txt'
const FILE2 = 'file2.txt'
const FILE3 = 'file3.txt'
var existingString = '';

const concatFun = (existingString, newString) => {
    if (existingString)
        return existingString + ' ' + newString;
    return newString
}

const readFile = (filePath, callback) => {
    fs.exists(path.join(__dirname, filePath), exists => {
        if (exists) {
            fs.open(path.join(__dirname, filePath), 'r', (error, data) => {
                if (error)
                    throw error;
                fs.readFile(path.join(__dirname, filePath), 'utf8', (err, d) => {
                    callback(d);
                })
            })
        }
    });
}

const resultFun = readFile(FILE1, function (result) {
    if (result) {
        existingString = concatFun(existingString, result)
        readFile(FILE2, function (result1) {
            if (result1) {
                existingString = concatFun(existingString, result1)
                readFile(FILE3, function (result2) {
                    existingString = concatFun(existingString, result2);
                });
            }
        });
    }
})

//console.log(resultFun);
//console.log(existingString);
