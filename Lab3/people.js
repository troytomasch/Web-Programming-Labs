const { default: axios } = require("axios");

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
  return data;
}

async function getPersonById(findID) {
  if (typeof findID != "string") throw "Must enter id as a string";
  if (findID.trim().length == 0) throw "Id must not only contain spaces";
  const data = await getPeople();
  for (const i of data) {
    if (i.id == findID) {
      return i;
      break;
    }
  }
  throw "Person not found";
}

async function sameStreet(streetName, streetSuffix) {
  if (typeof streetName != "string") throw "Must enter street name as a string";
  if (typeof streetSuffix != "string")
    throw "Must enter street suffix as a string";
  if (streetName.trim().length == 0 || streetSuffix.trim().length == 0)
    throw "Street name or suffix can not be just spaces";
  let name = streetName.charAt(0).toUpperCase() + streetName.slice(1);
  let suffix = streetSuffix.charAt(0).toUpperCase() + streetSuffix.slice(1);
  const data = await getPeople();
  let returnArray = [];
  for (const i of data) {
    if (
      i.address.home.street_name == name &&
      i.address.home.street_suffix == suffix
    ) {
      returnArray.push(i);
    }
    if (
      i.address.work.street_name == name &&
      i.address.work.street_suffix == suffix
    ) {
      returnArray.push(i);
    }
  }
  if (returnArray.length < 2) {
    throw "There is not more than one person that lives or works at this address";
  }
  return returnArray;
}

async function manipulateSsn() {
  const data = await getPeople();
  let ssns = {};
  let current = "";
  let total = 0;
  for (const i of data) {
    current = i.ssn.replace("-", "");
    current = current.replace("-", "");
    current = current.split("").sort().join("");
    ssns[i.ssn] = current;
  }
  let min = Number.MAX_VALUE;
  let max = 0;
  let maxP = "";
  let minP = "";
  let num = 0;
  for (const i in ssns) {
    total += Number(ssns[i]);
    num++;
    if (ssns[i] > max) {
      max = ssns[i];
      maxP = i;
    }
    if (ssns[i] < min) {
      min = ssns[i];
      minP = i;
    }
  }
  let highestP = {};
  let lowestP = {};
  for (const i of data) {
    if (i.ssn == maxP) {
      highestP = { firstName: i.first_name, lastName: i.last_name };
    }
    if (i.ssn == minP) {
      lowestP = { firstName: i.first_name, lastName: i.last_name };
    }
  }
  return {
    highest: highestP,
    lowest: lowestP,
    average: Math.floor(total / num),
  };
}

async function sameBirthday(month, day) {
  month = Number(month);
  day = Number(day);
  if (!month) throw "Month entered invalid";
  if (!day) throw "Day entered invalid";
  if (typeof month != "number") throw "Month entered invalid";
  if (typeof day != "number") throw "Day entered invalid";
  if (month < 1 || month > 12) throw "Month entered invalid";
  let monthsDays = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };
  if (day > monthsDays[month] || day < 1) throw "Day entered invalid";
  const data = await getPeople();
  let people = [];
  let cMonth;
  let cDay;
  for (const i of data) {
    cMonth = Number(i.date_of_birth.substr(0, 2));
    cDay = Number(i.date_of_birth.substr(3, 2));
    if (month == cMonth && day == cDay) {
      people.push(i.first_name + " " + i.last_name);
    }
  }
  if (people.length == 0) throw "No people with that birthday found";
  return people;
}

module.exports = {
  getPersonById,
  sameStreet,
  manipulateSsn,
  sameBirthday,
};
