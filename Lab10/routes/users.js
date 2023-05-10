const express = require("express");
const router = express.Router();
const users = require("../data/users");

router.get("/", async (req, res) => {
  if (!req.session.user) {
    res.render("pages/login"), { title: "Login" };
  } else {
    res.redirect("/private");
  }
});

router.get("/signup", async (req, res) => {
  res.status(200).render("pages/signUp");
});

router.post("/signup", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  try {
    if (typeof username != "string") throw "Must enter username of type string";
    if (typeof password != "string") throw "Must enter password of type string";

    if (username.trim().length < 4) throw "Must enter valid username";
    let text = username.replace(/\W/g, "");
    if (text != username) throw "Username must only contain valid characters";
    text = password.replace(" ", "");
    if (password.length != text.length)
      throw "Password must not contain spaces";
    if (password.trim().length < 6)
      throw "Password must have 6 or more characters";

    const inserted = await users.createUser(username, password);
    if (inserted.userInserted == true) {
      res.redirect("/");
    } else {
      throw "Could not insert user";
    }
  } catch (e) {
    res.status(400).render("pages/signUp", { error: e });
  }
});

router.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  try {
    if (typeof username != "string") throw "Must enter username of type string";
    if (typeof password != "string") throw "Must enter password of type string";

    if (username.trim().length < 4) throw "Must enter valid username";
    let text = username.replace(/\W/g, "");
    if (text != username) throw "Username must only contain valid characters";
    text = password.replace(" ", "");
    if (password.length != text.length)
      throw "Password must not contain spaces";
    if (password.trim().length < 6)
      throw "Password must have 6 or more characters";

    const result = await users.checkUser(username, password);

    if (result.authenticated == true) {
      req.session.user = { username: username };
      res.redirect("/private");
    }
  } catch (e) {
    res.status(400).render("pages/login", { error: e, title: "Login" });
  }
});

router.get("/private", async (req, res) => {
  res.render("pages/loggedIn", {
    title: "Welcome",
    username: req.session.user.username,
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.render("pages/loggedOut", { title: "Logged Out" });
});

module.exports = router;
