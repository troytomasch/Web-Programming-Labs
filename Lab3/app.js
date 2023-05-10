const people = require("./people");
const stocks = require("./stocks");

async function main() {
  // try {
  //   const person = await people.getPersonById(" sdfsdfsdfsdfs ");
  //   console.log(person);
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const person = await people.sameStreet();
  //   console.log(person);
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const person = await people.manipulateSsn();
  //   console.log(person);
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const person = await people.sameBirthday(10, 26);
  //   console.log(person);
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const shareholder = await stocks.listShareholders();
  //   console.log(shareholder);
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const shareholder = await stocks.topShareholder("Powell Industries, Inc.");
  //   console.log(shareholder);
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const shareholder = await stocks.listStocks();
  //   console.log(shareholder);
  // } catch (e) {
  //   console.log(e);
  // }
  try {
    const shareholder = await stocks.getStockById(
      "f652f797-7ca0-4382-befb-2ab8be914ff0"
    );
    console.log(shareholder);
  } catch (e) {
    console.log(e);
  }
}

main();
