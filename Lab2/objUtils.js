module.exports = {
  computeObjects: (objects, func) => {
    if (!Array.isArray(objects)) throw "Must enter an array";
    if (objects.length == 0) throw "Must enter an array of objects";
    if (typeof func != "function") throw "Must enter a function";
    let newObj = {};
    for (let i of objects) {
      if (typeof i != "object") throw "Must enter an array of objects";
      for (const j in i) {
        if (typeof i[j] != "number")
          throw "You must enter a number as the value";
        if (j in newObj) {
          newObj[j] = newObj[j] + func(i[j]);
        } else {
          newObj[j] = func(i[j]);
        }
      }
    }
    return newObj;
  },
  commonKeys: (obj1, obj2) => {
    if (typeof obj1 != "object") throw "Must enter an object";
    if (typeof obj2 != "object") throw "Must enter an object";
    let newObj = {};
    for (const i in obj1) {
      if (i in obj2) {
        if (obj1[i] == obj2[i]) {
          newObj[i] = obj1[i];
        }
      }
    }
    return newObj;
  },
  flipObject: (object) => {
    if (typeof object != "object") throw "Must enter an object";
    if (Object.keys(object).length == 0)
      throw "Object must have at least one item";
    newObj = {};
    for (const i in object) {
      if (typeof object[i] == "object") {
        if (Array.isArray(object[i])) {
          for (const j of object[i]) {
            newObj[j] = i;
          }
        } else {
          let tempObj = {};
          for (const j in object[i]) {
            tempObj[object[i][j]] = j;
          }
          newObj[i] = tempObj;
        }
      } else {
        newObj[object[i]] = i;
      }
    }
    return newObj;
  },
};
