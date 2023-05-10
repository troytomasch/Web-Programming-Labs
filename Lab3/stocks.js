const { default: axios } = require("axios");
const peopleUtil = require("./people");

async function getStocks() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
  );
  return data;
}

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
  return data;
}

async function listShareholders() {
  if (arguments.length > 0) throw "Too many arguments";
  const stocks = await getStocks();
  const people = await getPeople();
  let rStocks = [];
  for (const i of stocks) {
    let shareholders = i.shareholders;
    let rShareholders = [];
    let person = {};
    for (const j of shareholders) {
      for (const k of people) {
        if (k.id == j.userId) {
          person = k;
          break;
        }
      }
      let sharehold = {
        first_name: person.first_name,
        last_name: person.last_name,
        number_of_shares: j.number_of_shares,
      };
      rShareholders.push(sharehold);
    }
    let obj = {
      id: i.id,
      stock_name: i.stock_name,
      shareholders: rShareholders,
    };
    rStocks.push(obj);
  }
  return rStocks;
}

async function topShareholder(stockName) {
  if (typeof stockName != "string") throw "Stock name is not valid";
  if (stockName.trim().length == 0) throw "Stock name can not just be spaces";
  const stocks = await getStocks();
  let max = -1;
  let maxId = " ";
  for (const i of stocks) {
    if (i.stock_name == stockName) {
      max = 0;
      for (const j of i.shareholders) {
        if (j.number_of_shares > max) {
          max = j.number_of_shares;
          maxId = j.userId;
        }
      }
    }
  }
  if (max == -1) {
    throw "Stock not found";
  }
  if (max == 0) {
    return `${stockName} currently has no shareholders.`;
  }
  let person = await peopleUtil.getPersonById(maxId);
  return `With ${max} shares in ${stockName}, ${person.first_name} ${person.last_name} is the top shareholder.`;
}

async function listStocks(firstName, lastName) {
  if (typeof firstName != "string") throw "First name is not valid";
  if (firstName.trim().length == 0) throw "First name can not just be spaces";
  if (typeof lastName != "string") throw "Last name is not valid";
  if (lastName.trim().length == 0) throw "Last name can not just be spaces";
  let people = await getPeople();
  let stocks = await getStocks();
  let stonks = [];
  let personid = "";
  for (const i of people) {
    if (i.first_name == firstName && i.last_name == lastName) {
      personid = i.id;
    }
  }
  if (personid.length == 0) {
    throw "Person not found";
  }
  for (const i of stocks) {
    for (const j of i.shareholders) {
      if (j.userId == personid) {
        let stock = {
          stock_name: i.stock_name,
          number_of_shares: j.number_of_shares,
        };
        stonks.push(stock);
      }
    }
  }
  if (stonks.length == 0) {
    throw `${firstName} ${lastName} does not own any stonks`;
  }
  return stonks;
}

async function getStockById(id) {
  if (typeof id != "string") throw "Id must be a string";
  if (id.trim().length == 0) throw "Id can not be only spaces";
  let stocks = await getStocks();
  for (const i of stocks) {
    if (i.id == id) {
      return i;
    }
  }
  throw "Stock not found";
}

module.exports = {
  listShareholders,
  topShareholder,
  listStocks,
  getStockById,
};
