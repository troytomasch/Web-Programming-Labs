const questionOne = function questionOne(arr) {
  // Implement question 1 here
  let isPrime = (num) => {
    let divisor = num - 1;
    if (num == 1) {
      return true;
    }
    while (divisor != 1) {
      if (num % divisor == 0) {
        return false;
      }
      divisor--;
    }
    return true;
  };

  let result = 0;
  let resultObj = {};
  if (!arr) {
    return resultObj;
  }
  for (let x of arr) {
    result = Math.abs(Math.pow(x, 2) - 7);
    resultObj[result] = isPrime(result);
  }
  return resultObj;
};

const questionTwo = function questionTwo(arr) {
  // Implement question 2 here
  let newArray = [];
  for (let x of arr) {
    if (!newArray.includes(x)) {
      newArray.push(x);
    }
  }
  return newArray;
};

const questionThree = function questionThree(arr) {
  // Implement question 3 here

  let sortString = (str) => {
    return str.split("").sort().join(""); // Referenced https://stackoverflow.com/questions/30912663/sort-a-string-alphabetically-using-a-function
  };

  let returnObject = {};
  let returnArray = [];
  for (let i of arr) {
    for (let j of arr) {
      if (i == j) {
        continue;
      }
      if (sortString(i) == sortString(j)) {
        if (!returnArray.includes(i)) {
          returnArray.push(i);
        }
        if (!returnArray.includes(j)) {
          returnArray.push(j);
        }
      }
    }
  }
  if (returnArray.length == 0) {
    return returnObject;
  }
  returnObject[sortString(returnArray[0])] = returnArray;
  return returnObject;
};

const questionFour = function questionFour(num1, num2, num3) {
  // Implement question 4 here

  let factorial = (num) => {
    if (num < 1) {
      return 1;
    }
    return num * factorial(num - 1);
  };

  let average = (num1, num2, num3) => {
    return (num1 + num2 + num3) / 3;
  };

  return Math.floor(
    (factorial(num1) + factorial(num2) + factorial(num3)) /
      average(num1, num2, num3)
  );
};

module.exports = {
  firstName: "Troy",
  lastName: "Tomasch",
  studentId: "10446641",
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
