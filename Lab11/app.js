const express = require("express");
const app = express();
const path = require("path");

app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("*", async (req, res) => {
  res.sendFile(path.resolve("views/main.html"));
});

app.listen(3000, () => {
  console.log("Your routes will be running on http://localhost:3000");
});
