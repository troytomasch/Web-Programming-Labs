const md5 = require("blueimp-md5");
const publickey = "be40b7bd3ff63bcee0170359b0eee0f1";
const privatekey = "81d9dee35854024bac936976cbf6a114ab80a20e";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
const { default: axios } = require("axios");

async function getCharacterById(id) {
  try {
    const url =
      baseUrl +
      "/" +
      id +
      "?ts=" +
      ts +
      "&apikey=" +
      publickey +
      "&hash=" +
      hash;
    data = await axios.get(url);
    return data;
  } catch (e) {
    return e;
  }
}

async function getCharacterBySearch(search) {
  try {
    const url =
      baseUrl +
      "?nameStartsWith=" +
      search +
      "&ts=" +
      ts +
      "&apikey=" +
      publickey +
      "&hash=" +
      hash;
    data = await axios.get(url);
    return data;
  } catch (e) {
    return e;
  }
}

module.exports = {
  getCharacterById,
  getCharacterBySearch,
};
