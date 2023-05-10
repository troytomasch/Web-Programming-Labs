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

module.exports = {
  getPeople,
  getPersonById,
};
