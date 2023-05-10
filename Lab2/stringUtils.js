module.exports = {
  sortString: (string) => {
    if (typeof string != "string") throw "Must enter a string";
    if (string.length == 0) throw "String length must be greater than 0";
    if (string.trim().length == 0) throw "String must not just contain spaces";
    let stringArray = string.split("");
    let upperArray = [];
    let lowerArray = [];
    let numArray = [];
    let symArray = [];
    let spaceArray = [];
    for (const i of stringArray) {
      let val = i.charCodeAt();
      if (val < 58 && val > 47) {
        numArray.push(i);
      } else {
        if (val < 91 && val > 64) {
          upperArray.push(i);
        } else if (val < 123 && val > 96) {
          lowerArray.push(i);
        } else if (i == " ") {
          spaceArray.push(i);
        } else {
          symArray.push(i);
        }
      }
    }
    upperArray.sort();
    lowerArray.sort();
    numArray.sort(function (a, b) {
      return a - b;
    });
    symArray.sort();
    let finalArray = upperArray.concat(
      lowerArray,
      symArray,
      numArray,
      spaceArray
    );
    return finalArray.join("");
  },
  replaceChar: (string, idx) => {
    if (typeof string != "string") throw "Must input string";
    if (string.length == 0) throw "String must not be empty";
    if (string.trim().length == 0) throw "String may not only have spaces";
    if (typeof idx != "number") throw "Index must be a number";
    if (idx < 1 || idx > string.length - 2) throw "Invalid index";
    let stringArray = string.split("");
    let repChar = string[idx];
    let newChars = [string[idx - 1], string[idx + 1]];
    let alternate = 0;
    for (let i = 0; i < stringArray.length; i++) {
      if (i == idx) {
        continue;
      } else if (stringArray[i] == repChar) {
        stringArray[i] = newChars[alternate];
        if (alternate == 0) {
          alternate = 1;
        } else {
          alternate = 0;
        }
      }
    }
    let returnString = stringArray.join("");
    return returnString;
  },
  mashUp: (string1, string2, char) => {
    if (typeof string1 != "string") throw "Must input string";
    if (string1.length == 0) throw "String must not be empty";
    if (string2.trim().length == 0) throw "String may not only have spaces";
    if (typeof string2 != "string") throw "Must input string";
    if (string2.length == 0) throw "String must not be empty";
    if (string2.trim().length == 0) throw "String may not only have spaces";
    if (typeof char != "string") throw "Char must be a char";
    if (char.length != 1) throw "Must enter a char";
    if (char == " ") throw "Char must not be a space";
    let array1 = string1.split("");
    let array2 = string2.split("");
    let str = "";
    for (let i = 0; i < Math.max(string1.length, string2.length); i++) {
      if (i >= string1.length) {
        str = str.concat(char);
      } else {
        str = str.concat(array1[i]);
      }
      if (i >= string2.length) {
        str = str.concat(char);
      } else {
        str = str.concat(array2[i]);
      }
    }
    return str;
  },
};
