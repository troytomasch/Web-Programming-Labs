const users = require("./data/users");
const connection = require("./config/mongoConnection");

async function seed() {
  try {
    await users.createUser("TroyT", "yourmom1");
  } catch (e) {
    console.log(e);
  }

  try {
    await users.createUser("bigron", "apple123");
  } catch (e) {
    console.log(e);
  }

  try {
    await users.createUser("mattyice", "deeznuts");
  } catch (e) {
    console.log(e);
  }

  const db = await connection.connectToDb();
  await connection.closeConnection();

  console.log("Database seeded!");
}

try {
  seed();
} catch (e) {
  console.log(e);
}
