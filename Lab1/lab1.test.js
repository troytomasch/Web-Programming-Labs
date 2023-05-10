const lab1 = require("./lab1");

// Question 1 test cases
console.log(lab1.questionOne([2]));
// should return and output: {'3': true}

console.log(lab1.questionOne([5, 3, 10]));
//returns and outputs: {'2': true, '18': false, '93': false}

console.log(lab1.questionOne([2, 4, 8, 13]));
//returns and outputs: {'3': true, '9': false, '57': false, '162': false}

console.log(lab1.questionOne([12]));
// should return and output: {'137': true}

console.log(lab1.questionOne([]));
// returns and outputs: {}

// Question 2 test cases
console.log(lab1.questionTwo([1, 2, 3, 2, 1]));
// should return and output: [1, 2, 3]

console.log(lab1.questionTwo([1, "1", 1, "1", 1, "1"]));
//returns and outputs: [1, "1"]

console.log(lab1.questionTwo([1, 2, 3, 4, 3, 2, 1]));
// returns and outputs: [1, 2, 3, 4]

console.log(lab1.questionTwo(["hey", "hey", "one", 1, "two", "two", "1"]));
// returns and outputs: ["hey", "one", 1, "two", "1"]

console.log(lab1.questionTwo([]));
//returns and outputs: []

// Question 3 Test Cases
console.log(lab1.questionThree(["bar", "car", "car", "arc"]));
// should return and output: { acr: ["car", "arc"] }

console.log(
  lab1.questionThree(["troy", "yort", "tomasch", "royt", "troy", "masch"])
);
// should return and output: {orty : ["troy", "yort", "royt"] }

console.log(lab1.questionThree(["abcde", "adebc", "xzy", "bedca", "bade"]));
// should return and output: {abcde : ["abcde", "adebc", "bedca"] }

console.log(
  lab1.questionThree(["one", "two", "three", "four", "four", "four"])
);
// should return and output: { }

console.log(lab1.questionThree([]));
// should return and output: { }

// Question 4 Test Cases
console.log(lab1.questionFour(1, 3, 2));
// should return and output: 4

console.log(lab1.questionFour(2, 5, 6));
//returns and outputs: 194

console.log(lab1.questionFour(5, 2, 4));
//returns and outputs: 39

console.log(lab1.questionFour(4, 7, 8));
// //returns and outputs: 7165

console.log(lab1.questionFour(0, 2, 5));
// //returns and outputs: 52
