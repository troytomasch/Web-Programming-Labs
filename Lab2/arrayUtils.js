const stringUtils = require("./stringUtils");

module.exports = {
  average: (arrays) => {
    if (!Array.isArray(arrays)) throw "Must enter an array of arrays";
    if (arrays.length == 0) throw "Arrays entered must contain data";
    let finalArray = [];
    let finalCount = 0;
    for (let i = 0; i < arrays.length; i++) {
      if (arrays[i].isArray) throw "Must enter an array of arrays";
      if (arrays[i].length == 0) throw "Arrays entered must contain data";
      for (let j = 0; j < arrays[i].length; j++) {
        if (typeof arrays[i][j] != "number")
          throw "Data in the arrays must be numbers";
        finalArray.push(arrays[i][j]);
      }
    }
    for (let i = 0; i < finalArray.length; i++) {
      finalCount += finalArray[i];
    }
    return Math.round(finalCount / finalArray.length);
  },
  modeSquared: (array) => {
    if (!Array.isArray(array)) throw "Must enter an array";
    if (array.length == 0) throw "Array entered must contain data";
    let currMode = 0;
    let maxMode = 0;
    let modeElement = [];
    for (const i of array) {
      if (typeof i != "number") throw "Array must contain numbers";
      for (const j of array) {
        if (i == j) {
          currMode++;
        }
      }
      if (currMode > maxMode) {
        modeElement = [i];
        maxMode = currMode;
      } else if (
        currMode == maxMode &&
        currMode != 0 &&
        !modeElement.includes(i)
      ) {
        modeElement.push(i);
      }
      currMode = 0;
    }
    if (maxMode == 1) {
      return 0;
    } else if (modeElement.length == 1) {
      return modeElement[0] * modeElement[0];
    } else {
      let finalSum = 0;
      for (const i of modeElement) {
        finalSum += i * i;
      }
      return finalSum;
    }
  },
  medianElement: (array) => {
    if (!Array.isArray(array)) throw "Must enter an array";
    if (array.length == 0) throw "Array entered must contain data";
    for (const i of array) {
      if (typeof i != "number") throw "Array must contain numbers";
    }
    let unsortedArray = [];
    for (let i = 0; i < array.length; i++) {
      unsortedArray[i] = array[i];
    }
    let sortedArray = array.sort();
    let obj = {};
    if (array.length % 2 == 0) {
      let element =
        (sortedArray[array.length / 2] + sortedArray[array.length / 2 - 1]) / 2;
      let index = Math.max(
        unsortedArray.indexOf(sortedArray[array.length / 2]),
        unsortedArray.indexOf(sortedArray[array.length / 2 - 1])
      );
      obj[element] = index;
      return obj;
    } else {
      let element = sortedArray[(array.length - 1) / 2];
      let index = unsortedArray.indexOf(element);
      obj[element] = index;
      return obj;
    }
  },
  merge: (arrayOne, arrayTwo) => {
    if (!Array.isArray(arrayTwo)) throw "Must enter an array";
    if (arrayOne.length == 0) throw "Array entered must contain data";
    if (!Array.isArray(arrayOne)) throw "Must enter an array";
    if (arrayTwo.length == 0) throw "Array entered must contain data";
    let upperArray = [];
    let lowerArray = [];
    let numArray = [];
    for (const i of arrayOne) {
      if (typeof i == "number") {
        numArray.push(i);
      } else if (typeof i == "string") {
        if (i.length > 1) throw "Must only enter chars";
        if (i == i.toUpperCase()) {
          upperArray.push(i);
        } else {
          lowerArray.push(i);
        }
      } else {
        throw "Data must be a number or a char";
      }
    }
    for (const i of arrayTwo) {
      if (typeof i == "number") {
        numArray.push(i);
      } else if (typeof i == "string") {
        if (i.length > 1) throw "Must only enter chars";
        if (i == i.toUpperCase()) {
          upperArray.push(i);
        } else {
          lowerArray.push(i);
        }
      } else {
        throw "Data must be a number or a char";
      }
    }
    lowerArray.sort();
    upperArray.sort();
    numArray.sort(function (a, b) {
      return a - b;
    });
    let finalArray = lowerArray.concat(upperArray, numArray);
    return finalArray;
  },
};
