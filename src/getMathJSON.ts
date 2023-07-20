// import the mathjs library
const math = require('mathjs');
const fs = require('fs');



// get an array of all the property names of the mathjs object
const allFunctions = [];
const functionsObjects = [];
for (const key in math) {
  if (typeof math[key] === 'function') {
    allFunctions.push(key);
  }
}

//iterate through them and get JSONs of all methods that are eligible (have math.help() section)
for(const index in allFunctions) {
  try {
    math.help(allFunctions[index]);
  }catch(error) {
    continue;
  }

  functionsObjects.push(math.help(allFunctions[index]).doc);
}

let jsonString = JSON.stringify(functionsObjects, null, 2);

//write it in file
fs.writeFile('mathMethods.json', jsonString, (err: Error) => {
  if (err) {
    console.error('Error writing JSON file:', err);
  } else {
    console.log('JSON file created successfully!');
  }
});
