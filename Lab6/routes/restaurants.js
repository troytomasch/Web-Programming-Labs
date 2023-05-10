const express = require("express");
const router = express.Router();
const data = require("../data");
const restaurantData = data.resturants;
var objectID = require("mongodb").ObjectId;

router.get("/", async (req, res) => {
  try {
    const restaurantList = await restaurantData.getAll();
    var returnRestaurants = [];
    for (const i of restaurantList) {
      var rest = { _id: String(i._id), name: i.name };
      returnRestaurants.push(rest);
    }
    res.json(returnRestaurants);
  } catch (e) {
    res.sendStatus(404);
  }
});

router.post("/", async (req, res) => {
  const inputRest = req.body;

  if (!inputRest) {
    res.status(400).json({ error: "Must enter data to create a restaurant" });
    return;
  }
  // Validate name
  if (typeof inputRest.name != "string") {
    res.status(400).json({ error: "Must provide a string name" });
    return;
  }

  if (inputRest.name.trim().length == 0) {
    res.status(400).json({ error: "Name must not be only spaces" });
    return;
  }
  // Validate location
  if (typeof inputRest.location != "string") {
    res.status(400).json({ error: "Must provide a string location" });
    return;
  }
  if (inputRest.location.trim().length == 0) {
    res.status(400).json({ error: "Location must not be only spaces" });
    return;
  }
  // Validate phonenumber
  if (typeof inputRest.phoneNumber != "string") {
    res.status(400).json({ error: "Must provide a string phone number" });
    return;
  }
  const pnum = inputRest.phoneNumber.split("");
  if (pnum.length != 12) {
    res.status(400).json({ error: "Phone number must be the proper length" });
    return;
  }
  if (pnum[3] != "-" || pnum[7] != "-") {
    res.status(400).json({ error: "Phone number must be the proper format" });
    return;
  }
  // Validate website
  if (typeof inputRest.website != "string") {
    res.status(400).json({ error: "Must provide a string website" });
    return;
  }
  if (inputRest.website.trim().length == 0) {
    res.status(400).json({ error: "Website must not be only spaces" });
    return;
  }
  if (inputRest.website.substr(0, 11) != "http://www.") {
    res.status(400).json({ error: "Must enter valid website" });
    return;
  }
  if (inputRest.website.slice(-4) != ".com") {
    res.status(400).json({ error: "Must enter valid website" });
    return;
  }
  if (inputRest.website.length < 20) {
    res.status(400).json({ error: "Must enter valid website" });
    return;
  }
  // Validate pricerange
  if (typeof inputRest.priceRange != "string") {
    res.status(400).json({ error: "Must provide a string price range" });
    return;
  }
  if (inputRest.priceRange.trim().length == 0) {
    res.status(400).json({ error: "Price range must not be only spaces" });
    return;
  }
  if (inputRest.priceRange.length < 1 || inputRest.priceRange.length > 4) {
    res.status(400).json({ error: "Price range is too long" });
    return;
  }
  for (const i of inputRest.priceRange.split("")) {
    if (i != "$") {
      res.status(400).json({ error: "Price range is not valid" });
      return;
    }
  }

  // Validate cuisines
  if (!Array.isArray(inputRest.cuisines)) {
    res.status(400).json({ error: "Must provide an array cuisines" });
    return;
  }
  if (inputRest.cuisines.length < 1) {
    res.status(400).json({ error: "Must provide an array with cuisines" });
    return;
  }
  for (const i of inputRest.cuisines) {
    if (typeof i != "string") {
      res.status(400).json({ error: "Must provide cuisines as strings" });
      return;
    }
    if (i.trim().length == 0) {
      res.status(400).json({ error: "Cuisines can not be only spaces" });
      return;
    }
  }

  // Validate service options
  if (typeof inputRest.serviceOptions != "object") {
    res.status(400).json({ error: "Services options must be an object" });
    return;
  }
  for (const i in inputRest.serviceOptions) {
    if (typeof inputRest.serviceOptions[i] != "boolean") {
      res.status(400).json({ error: "Service options must be booleans" });
      return;
    }
  }
  try {
    const newRestaurant = await restaurantData.create(
      inputRest.name,
      inputRest.location,
      inputRest.phoneNumber,
      inputRest.website,
      inputRest.priceRange,
      inputRest.cuisines,
      inputRest.serviceOptions
    );
    res.json(newRestaurant);
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (typeof id != "string") {
    res.status(400).json({ error: "Must provide a string id" });
    return;
  }
  if (id.trim().length == 0) {
    res.status(400).json({ error: "Id must not be only spaces" });
    return;
  }
  let newId = objectID(id);
  if (!objectID.isValid(newId)) {
    res.status(400).json({ error: "Id must be valid" });
    return;
  }
  try {
    const restaurant = await restaurantData.get(id);
    res.json(restaurant);
  } catch (e) {
    res.sendStatus(404).json({ error: "Restaurant not found" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const inputRest = req.body;
  // Validate name
  if (typeof inputRest.name != "string") {
    res.status(400).json({ error: "Must provide a string name" });
    return;
  }
  if (inputRest.name.trim().length == 0) {
    res.status(400).json({ error: "Name must not be only spaces" });
    return;
  }
  // Validate location
  if (typeof inputRest.location != "string") {
    res.status(400).json({ error: "Must provide a string location" });
    return;
  }
  if (inputRest.location.trim().length == 0) {
    res.status(400).json({ error: "Location must not be only spaces" });
    return;
  }
  // Validate phonenumber
  if (typeof inputRest.phoneNumber != "string") {
    res.status(400).json({ error: "Must provide a string phone number" });
    return;
  }
  const pnum = inputRest.phoneNumber.split("");
  if (pnum.length != 12) {
    res.status(400).json({ error: "Phone number must be the proper length" });
    return;
  }
  if (pnum[3] != "-" || pnum[7] != "-") {
    res.status(400).json({ error: "Phone number must be the proper format" });
    return;
  }
  // Validate website
  if (typeof inputRest.website != "string") {
    res.status(400).json({ error: "Must provide a string website" });
    return;
  }
  if (inputRest.website.trim().length == 0) {
    res.status(400).json({ error: "Website must not be only spaces" });
    return;
  }
  if (inputRest.website.substr(0, 11) != "http://www.") {
    res.status(400).json({ error: "Must enter valid website" });
    return;
  }
  if (inputRest.website.slice(-4) != ".com") {
    res.status(400).json({ error: "Must enter valid website" });
    return;
  }
  if (inputRest.website.length < 20) {
    res.status(400).json({ error: "Must enter valid website" });
    return;
  }
  // Validate pricerange
  if (typeof inputRest.priceRange != "string") {
    res.status(400).json({ error: "Must provide a string price range" });
    return;
  }
  if (inputRest.priceRange.trim().length == 0) {
    res.status(400).json({ error: "Price range must not be only spaces" });
    return;
  }
  if (inputRest.priceRange.length < 1 || inputRest.priceRange.length > 4) {
    res.status(400).json({ error: "Price range is too long" });
    return;
  }
  for (const i of inputRest.priceRange.split("")) {
    if (i != "$") {
      res.status(400).json({ error: "Price range is not valid" });
      return;
    }
  }

  // Validate cuisines
  if (!Array.isArray(inputRest.cuisines)) {
    res.status(400).json({ error: "Must provide an array cuisines" });
    return;
  }
  if (inputRest.cuisines.length < 1) {
    res.status(400).json({ error: "Must provide an array with cuisines" });
    return;
  }
  for (const i of inputRest.cuisines) {
    if (typeof i != "string") {
      res.status(400).json({ error: "Must provide cuisines as strings" });
      return;
    }
    if (i.trim().length == 0) {
      res.status(400).json({ error: "Cuisines can not be only spaces" });
      return;
    }
  }

  // Validate service options
  if (typeof inputRest.serviceOptions != "object") {
    res.status(400).json({ error: "Services options must be an object" });
    return;
  }
  for (const i in inputRest.serviceOptions) {
    if (typeof inputRest.serviceOptions[i] != "boolean") {
      res.status(400).json({ error: "Service options must be booleans" });
      return;
    }
  }

  try {
    const newRestaurant = await restaurantData.update(
      id,
      inputRest.name,
      inputRest.location,
      inputRest.phoneNumber,
      inputRest.website,
      inputRest.priceRange,
      inputRest.cuisines,
      inputRest.serviceOptions
    );
    res.json(newRestaurant);
  } catch (e) {
    res.status(404).json({ error: "Restaurant not found" });
  }
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  if (typeof id != "string") {
    res.status(404).json({ error: "Must provide a string id" });
    return;
  }
  if (id.trim().length == 0) {
    res.status(404).json({ error: "Id must not be only spaces" });
    return;
  }
  let newId = objectID(id);
  if (!objectID.isValid(newId)) {
    res.status(404).json({ error: "Id must be valid" });
    return;
  }
  try {
    await restaurantData.remove(id);
    res.json({ restaurantId: id, deleted: true });
  } catch (e) {
    res.status(404).json({ error: "Restaurant not found" });
  }
});

module.exports = router;
