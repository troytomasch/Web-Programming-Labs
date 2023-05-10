const restaurants = require("./data/restaurants");
const connection = require("./config/mongoConnection");

async function main() {
  let chinese = {};
  // let pizza = {};
  try {
    chinese = await restaurants.create(
      "Lim Fong Delites",
      "Mt Holly",
      "609-251-6451",
      "http://www.limfongs.com",
      "$$",
      ["Chinese"],
      2,
      { dineIn: true, takeOut: true, delivery: true },
      "hereyago"
    );
    console.log(chinese);
  } catch (e) {
    console.log(e);
  }
  // try {
  //   pizza = await restaurants.create(
  //     "Mario's",
  //     "Hoboken",
  //     "180-012-4532",
  //     "http://www.pizzapie.com",
  //     "$$",
  //     ["Italian", "Pizza"],
  //     3,
  //     { dineIn: true, takeOut: true, delivery: true }
  //   );
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const all = await restaurants.getAll();
  //   console.log(all);
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const deli = await restaurants.create(
  //     "Troy's Deli",
  //     "Hoboken",
  //     "123-123-5432",
  //     "http://www.thisrestaurant.com",
  //     "$",
  //     ["Italian", "Deli"],
  //     5,
  //     { dineIn: false, takeOut: true, delivery: true }
  //   );
  //   console.log(deli);
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const chineseagain = await restaurants.rename(
  //     String(chinese._id),
  //     "http://www.limfongdelites.com"
  //   );
  //   console.log(chineseagain);
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const deleted = await restaurants.remove(String(pizza._id));
  //   console.log(deleted);
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const all = await restaurants.getAll();
  //   console.log(all);
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const throws1 = await restaurants.create("A name?", "herewego", "1234444");
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const throws2 = await restaurants.remove("6164dfa3acc62f167e25b579");
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const throws3 = await restaurants.rename(
  //     "6164dfa3acc62f167e25b579",
  //     "http://www.herewego.com"
  //   );
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const throws4 = await restaurants.rename(434343, "herewego.com");
  // } catch (e) {
  //   console.log(e);
  // }
  // try {
  //   const throws5 = await restaurants.get("6164dfa3acc62f167e25b579");
  // } catch (e) {
  //   console.log(e);
  // }

  const db = await connection.connectToDb();
  await connection.closeConnection();
}

main();
