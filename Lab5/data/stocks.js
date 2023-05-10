const { default: axios } = require("axios");

async function getStocks() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
  );
  return data;
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
  getStocks,
  getStockById,
};
