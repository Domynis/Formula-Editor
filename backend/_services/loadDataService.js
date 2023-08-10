const math = require('mathjs');
class LoadMathService {
  mathJsonString = "";
  loadData() {
    if (this.mathJsonString.length != 0) { //do not redo the calculations if done once per session
      return this.mathJsonString;
    }
    // get an array of all the property names of the mathjs object
    const allFunctions = [];
    const functionsObjects = [];
    for (const key in math) {
      if (typeof math[key] === 'function') {
        allFunctions.push(key);
      }
    }

    //iterate through them and get JSONs of all methods that are eligible (have math.help() section)
    for (const index in allFunctions) {
      try {
        math.help(allFunctions[index]);
      } catch (error) {
        continue;
      }
      let fctCategory = math.help(allFunctions[index]).doc.category;
      if (fctCategory != "Core") {
        let functionObject = math.help(allFunctions[index]).doc;
        if (typeof functionObject.description === 'string') { //some functions have descriptions that are arrays => let's make all descriptions arrays of strings
          let descriptionString = functionObject.description;
          functionObject.description = [descriptionString];
        }
        //categories with varying syntax
        if (functionObject.category === "Logical" || functionObject.category === "Bitwise" || functionObject.category === "Operators" || functionObject.name === "boolean" && functionObject.syntax.length > 1) {
          let correctSyntax = functionObject.syntax[functionObject.syntax.length - 1];
          functionObject.syntax = [correctSyntax];
        }
        //precise exceptions
        if (functionObject.name === "index") {
          let correctSyntax = "index([start1; end1], [start2; end2], ...)";
          functionObject.syntax = [correctSyntax];
        }
        if (functionObject.name === "subset") {
          let correctSyntax = "subset(value, index)";
          functionObject.syntax = [correctSyntax];
        }
        if(functionObject.name === "factorial") {
          let correctSyntax = "factorial(n)";
          functionObject.syntax = [correctSyntax];
        }

        functionsObjects.push(math.help(allFunctions[index]).doc);
      }
    }

    let jsonString = JSON.stringify(functionsObjects, null, 2);
    this.mathJsonString = jsonString;//saves the string 
    return this.mathJsonString;
  }
}

module.exports = LoadMathService;