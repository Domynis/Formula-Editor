"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import the mathjs library
var math = require('mathjs');
var fs = require("fs");
// get an array of all the property names of the mathjs object
var allFunctions = [];
var functionsObjects = [];
for (var key in math) {
    if (typeof math[key] === 'function') {
        allFunctions.push(key);
    }
}
//iterate through them and get JSONs of all methods that are eligible (have math.help() section)
for (var index in allFunctions) {
    try {
        math.help(allFunctions[index]);
    }
    catch (error) {
        continue;
    }
    functionsObjects.push(math.help(allFunctions[index]).doc);
}
var jsonString = JSON.stringify(functionsObjects, null, 2);
//write it in file
fs.writeFile('mathMethods.json', jsonString, function (err) {
    if (err) {
        console.error('Error writing JSON file:', err);
    }
    else {
        console.log('JSON file created successfully!');
    }
});
