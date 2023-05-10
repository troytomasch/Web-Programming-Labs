const arrayUtil = require("./arrayUtils");
const stringUtil = require("./stringUtils");
const objUtil = require("./objUtils");

// arrayUtils.js tests
// average([arrays]) tests
try {
  // Should Pass
  const test = arrayUtil.average([
    [3, 5, 7],
    [1, 5, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
  ]);
  console.log("average passed successfully");
} catch (e) {
  console.error("average failed test case");
}
try {
  // Should Fail
  const test = arrayUtil.average();
  console.error("average did not error");
} catch (e) {
  console.log("average failed successfully");
}

// modeSquared(array) tests
try {
  // Should Pass
  const test = arrayUtil.modeSquared([1, 2, 3, 4, 5, 5, 3]);
  console.log("modeSquared passed successfully");
} catch (e) {
  console.error("modeSquared failed test case");
}
try {
  // Should Fail
  const test = arrayUtil.modeSquared([]);
  console.error("modeSquared did not error");
} catch (e) {
  console.log("modeSquared failed successfully");
}

// medianElement(array) tests
try {
  // Should Pass
  const test = arrayUtil.medianElement([1, 3, 3, 3, 5]);
  console.log("medianElement passed successfully");
} catch (e) {
  console.error("medianElement failed test case");
}
try {
  // Should Fail
  const test = arrayUtil.medianElement([1, 2, "yuh"]);
  console.error("medianElement did not error");
} catch (e) {
  console.log("medianElement failed successfully");
}

// merge(arrayOne, arrayTwo) tests
try {
  // Should Pass
  const test = arrayUtil.merge(["E", "b", "a", 1], [4, 11, "z"]);
  console.log("merge passed successfully");
} catch (e) {
  console.error("merge failed test case");
}
try {
  // Should Fail
  const test = arrayUtil.merge([], [1, "nope"]);
  console.error("merge did not error");
} catch (e) {
  console.log("merge failed successfully");
}

// stringUtils.js Tests
// sortString(string) tests
try {
  // Should Pass
  const test = stringUtil.sortString("ABC def 123 !?");
  console.log("sortString passed successfully");
} catch (e) {
  console.error("sortString failed test case");
}
try {
  // Should Fail
  const test = stringUtil.sortString("     ");
  console.error("sortString did not error");
} catch (e) {
  console.log("sortString failed successfully");
}

// replaceChar(string, idx) tests
try {
  // Should Pass
  const test = stringUtil.replaceChar("Heyyyyyyy", 2);
  console.log("replaceChar passed successfully");
} catch (e) {
  console.error("replaceChar failed test case");
}
try {
  // Should Fail
  const test = stringUtil.replaceChar("heyoooo", 10);
  console.error("replaceChar did not error");
} catch (e) {
  console.log("replaceChar failed successfully");
}

// mashUp(string1, string2, char) tests
try {
  // Should Pass
  const test = stringUtil.mashUp("Troy", "Tomasch", "6");
  console.log("mashUp passed successfully");
} catch (e) {
  console.error("mashUp failed test case");
}
try {
  // Should Fail
  const test = stringUtil.mashUp("yoo", "yeooooooo");
  console.error("mashUp did not error");
} catch (e) {
  console.log("mashUp failed successfully");
}

//objUtils.js tests
const first = { x: 2, y: 3 };
const second = { a: 70, x: 4, z: 5 };
const third = { x: 50, y: 9, q: 10 };
const fourth = { x: 50, y: 9, q: 25, t: { x: 50, y: 9 } };
const fifth = { x: 50, y: 9, q: 25 };
const sixth = { a: 2, b: 7, t: { x: 6 } };
// computeObjects test
try {
  // Should Pass
  const test = objUtil.computeObjects([first, second, third], (x) => x * 2);
  console.log("computeObjects passed successfully");
} catch (e) {
  console.error("computeObjects failed test case");
}
try {
  // Should Fail
  const test = objUtil.computeObjects([first, "yo"], (x) => x * 2);
  console.error("computeObjects did not error");
} catch (e) {
  console.log("computeObjects failed successfully");
}

// commonKeys tests
try {
  // Should Pass
  const test = objUtil.commonKeys(fifth, fourth);
  console.log("commonKeys passed successfully");
} catch (e) {
  console.error("commonKeys failed test case");
}
try {
  // Should Fail
  const test = objUtil.commonKeys(first);
  console.error("commonKeys did not error");
} catch (e) {
  console.log("commonKeys failed successfully");
}

// flipObject(object) tests
try {
  // Should Pass
  const test = objUtil.flipObject(sixth);
  console.log("flipObject passed successfully");
} catch (e) {
  console.error("flipObject failed test case");
}
try {
  // Should Fail
  const test = objUtil.flipObject({});
  console.error("flipObject did not error");
} catch (e) {
  console.log("flipObject failed successfully");
}
