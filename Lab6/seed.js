const { response } = require("express");
const dbConnection = require("./config/mongoConnection");
const data = require("./data");
const restaurants = data.resturants;
const reviews = data.reviews;

async function main() {
  const db = await dbConnection.connectToDb();
  // Creating restaurant 1
  const andrew = await restaurants.create(
    "Andrew's Grill",
    "Morris Hills",
    "123-456-6969",
    "http://www.andrew.com",
    "$$",
    ["4x800, Hills"],
    { dineIn: true, takeOut: true, delivery: false }
  );
  await reviews.create(
    andrew._id,
    "Burgers",
    "Your mom",
    4,
    "10/28/2021",
    "There's ketchup in the burgers!!"
  );
  await reviews.create(
    andrew._id,
    "Bad",
    "Joe",
    1,
    "10/28/2021",
    "They raw dog all the food here"
  );

  // Creating restaurant 2
  const kajetan = await restaurants.create(
    "Kajetan's Biergarten",
    "Monroe, NY",
    "420-420-6969",
    "http://www.hamstrings.com",
    "$$$",
    ["German, Food"],
    { dineIn: true, takeOut: false, delivery: false }
  );
  await reviews.create(
    kajetan._id,
    "Pancakes",
    "Your dad",
    5,
    "10/28/2021",
    "Pancakes with chocolate chips are fire"
  );

  // Creating restaurant 3
  const ronnie = await restaurants.create(
    "Ronnie's Eggs and Smoothies",
    "Dubfield, NJ",
    "999-999-4200",
    "http://www.apple.com",
    "$",
    ["DuBfIeLd, Magnet"],
    { dineIn: true, takeOut: true, delivery: true }
  );
  await reviews.create(
    ronnie._id,
    "Boo hawks",
    "Lebron James",
    1,
    "10/28/2021",
    "Trae Young sucks"
  );
  await reviews.create(
    ronnie._id,
    "I love apple",
    "Steve Jobs",
    5,
    "10/28/2021",
    "Trae Young sucks"
  );

  // Creating restaurant 4
  const matt = await restaurants.create(
    "Matt's Omelettes",
    "Central Jersey",
    "420-420-1234",
    "http://www.lakers.com",
    "$$",
    ["Sixers, Giants"],
    { dineIn: false, takeOut: true, delivery: true }
  );
  await reviews.create(
    matt._id,
    "I suck",
    "Danny Dimes",
    4,
    "10/28/2021",
    "I can't run without falling over"
  );

  console.log("Done seeding database");

  await dbConnection.closeConnection();
}

main();
