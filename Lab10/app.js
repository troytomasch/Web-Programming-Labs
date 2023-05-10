const express = require("express");
const app = express();
const session = require("express-session");
const configRoutes = require("./routes");

const exphbs = require("express-handlebars");
const engine = exphbs.engine;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string",
    saveUninitialized: true,
    resave: false,
  })
);

app.use("*", (req, res, next) => {
  let timestamp = new Date().toUTCString();
  let method = req.method;
  let route = req.originalUrl;
  if (route == "/public/site.css") {
    next();
    return;
  }
  let user = false;
  if (req.session.user) {
    user = true;
  }
  let output =
    timestamp + ": " + method + " " + route + " Authenticated User: " + user;
  console.log(output);
  next();
});

app.use("/private", (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/");
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("Your routes will be running on http://localhost:3000");
});
