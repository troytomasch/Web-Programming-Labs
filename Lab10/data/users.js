const mongoCollections = require("./../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 16;

async function createUser(username, password) {
  if (typeof username != "string") throw "Must enter username of type string";
  if (typeof password != "string") throw "Must enter password of type string";

  if (username.trim().length < 4) throw "Must enter valid username";
  let text = username.replace(/\W/g, "");
  if (text != username) throw "Username must only contain valid characters";
  text = password.replace(" ", "");
  if (password.length != text.length) throw "Password must not contain spaces";
  if (password.trim().length < 6)
    throw "Password must have 6 or more characters";

  username = username.toLowerCase();

  const hashPass = await bcrypt.hash(password, saltRounds);

  const userCollection = await users();

  const noUser = await userCollection.findOne({ username: username });
  if (noUser != null) {
    throw "Username already taken";
  }

  const user = {
    username: username,
    password: hashPass,
  };

  const insertedInfo = await userCollection.insertOne(user);
  if (insertedInfo.insertedCount == 0) throw "Could not insert user";

  return { userInserted: true };
}

async function checkUser(username, password) {
  if (typeof username != "string") throw "Must enter username of type string";
  if (typeof password != "string") throw "Must enter password of type string";

  if (username.trim().length < 4) throw "Must enter valid username";
  let text = username.replace(/\W/g, "");
  if (text != username) throw "Username must only contain valid characters";
  text = password.replace(" ", "");
  if (password.length != text.length) throw "Password must not contain spaces";
  if (password.trim().length < 6)
    throw "Password must have 6 or more characters";

  username = username.toLowerCase();

  const userCollection = await users();

  let foundUser = await userCollection.findOne({ username: username });

  if (foundUser == null) throw "Either the username or password is invalid";

  if (await bcrypt.compare(password, foundUser.password)) {
    return { authenticated: true };
  }

  throw "Either the username or password is invalid";
}

module.exports = {
  createUser,
  checkUser,
};
