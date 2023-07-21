// export enum statusEnum {
//     success = 0,
//     failed = 1
//   };
const math = require('mathjs');
class LoadMathService{
    constructor(){

    }
    loadData () {
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
          let fctCategory = math.help(allFunctions[index]).doc.category;
          if(fctCategory != "Core")
              functionsObjects.push(math.help(allFunctions[index]).doc);
        }

        let jsonString = JSON.stringify(functionsObjects, null, 2);
        this.mathJsonString = jsonString;//saves the string 
        return this.mathJsonString; 
    }

    mathJsonString = "";
}

module.exports = LoadMathService;