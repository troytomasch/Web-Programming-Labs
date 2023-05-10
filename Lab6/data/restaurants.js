const mongoCollections = require("./../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
var objectID = require("mongodb").ObjectId;

async function get(id) {
  if (typeof id != "string") throw new Error("Must provide a string id");
  if (id.trim().length == 0) throw new Error("Id must not be only spaces");
  let newId = objectID(id);
  if (!objectID.isValid(newId)) throw new Error("Id must be valid");

  const restaurantsCollection = await restaurants();
  const rest = await restaurantsCollection.findOne({ _id: newId });
  if (rest === null) throw new Error("No restaurant with that id");
  rest._id = String(rest._id);
  return rest;
}

async function create(
  name,
  location,
  phoneNumber,
  website,
  priceRange,
  cuisines,
  serviceOptions
) {
  // Validate name
  if (typeof name != "string") throw new Error("Must provide a string name");
  if (name.trim().length == 0) throw new Error("Name must not be only spaces");

  // Validate location
  if (typeof location != "string")
    throw new Error("Must provide a string location");
  if (location.trim().length == 0)
    throw new Error("Location must not be only spaces");

  // Validate phonenumber
  if (typeof phoneNumber != "string")
    throw new Error("Must provide a string phone number");
  const pnum = phoneNumber.split("");
  if (pnum.length != 12)
    throw new Error("Phone number must be the proper length");
  if (pnum[3] != "-" || pnum[7] != "-")
    throw new Error("Phone number must be the proper format");

  // Validate website
  if (typeof website != "string")
    throw new Error("Must provide a string website");
  if (website.trim().length == 0)
    throw new Error("Website must not be only spaces");
  if (website.substr(0, 11) != "http://www.")
    throw new Error("Must enter valid website");
  if (website.slice(-4) != ".com") throw new Error("Must enter valid website");
  if (website.length < 20) throw new Error("Must enter valid website");

  // Validate pricerange
  if (typeof priceRange != "string")
    throw new Error("Must provide a string price range");
  if (priceRange.trim().length == 0)
    throw new Error("Price range must not be only spaces");
  if (priceRange.length < 1 || priceRange.length > 4)
    throw new Error("Price range is too long");
  for (const i of priceRange.split("")) {
    if (i != "$") {
      throw new Error("Price range is not valid");
    }
  }

  // Validate cuisines
  if (!Array.isArray(cuisines))
    throw new Error("Must provide an array cuisines");
  if (cuisines.length < 1)
    throw new Error("Must provide an array with cuisines");
  for (const i of cuisines) {
    if (typeof i != "string")
      throw new Error("Must provide cuisines as strings");
    if (i.trim().length == 0)
      throw new Error("Cuisines can not be only spaces");
  }

  // Validate service options
  if (typeof serviceOptions != "object")
    throw new Error("Services options must be an object");
  for (const i in serviceOptions) {
    if (typeof serviceOptions[i] != "boolean")
      throw new Error("Service options must be booleans");
  }

  const restaurantCollection = await restaurants();

  let newRestaurant = {
    name: name,
    location: location,
    phoneNumber: phoneNumber,
    website: website,
    priceRange: priceRange,
    cuisines: cuisines,
    overallRating: 0,
    serviceOptions: serviceOptions,
    reviews: [],
  };

  const insertInfo = await restaurantCollection.insertOne(newRestaurant);
  if (insertInfo.insertedCount === 0)
    throw new Error("Could not add restaurant");

  const newId = insertInfo.insertedId;

  const rest = await this.get(String(newId));
  rest._id = String(rest._id);
  return rest;
}

async function getAll() {
  const restaurantCollection = await restaurants();

  let restList = await restaurantCollection.find({}).toArray();

  for (let i = 0; i < restList.length; i++) {
    restList[i]._id = String(restList[i]._id);
  }

  return restList;
}

async function remove(id) {
  if (typeof id != "string") throw new Error("Must provide a string id");
  if (id.trim().length == 0) throw new Error("Id must not be only spaces");
  //   let newId = objectID(id);
  if (!objectID.isValid(objectID(id))) throw new Error("Id must be valid");

  const restaurantCollection = await restaurants();
  const rest = await this.get(id);
  const deletionInfo = await restaurantCollection.deleteOne({
    _id: objectID(id),
  });

  if (deletionInfo.deletedCount == 0)
    throw new Error("Could not delete restuarant");

  return `${rest.name} has been successfully deleted!`;
}

async function update(
  id,
  name,
  location,
  phoneNumber,
  website,
  priceRange,
  cuisines,
  serviceOptions
) {
  // Validate name
  if (typeof name != "string") throw new Error("Must provide a string name");
  if (name.trim().length == 0) throw new Error("Name must not be only spaces");

  // Validate location
  if (typeof location != "string")
    throw new Error("Must provide a string location");
  if (location.trim().length == 0)
    throw new Error("Location must not be only spaces");

  // Validate phonenumber
  if (typeof phoneNumber != "string")
    throw new Error("Must provide a string phone number");
  const pnum = phoneNumber.split("");
  if (pnum.length != 12)
    throw new Error("Phone number must be the proper length");
  if (pnum[3] != "-" || pnum[7] != "-")
    throw new Error("Phone number must be the proper format");

  // Validate website
  if (typeof website != "string")
    throw new Error("Must provide a string website");
  if (website.trim().length == 0)
    throw new Error("Website must not be only spaces");
  if (website.substr(0, 11) != "http://www.")
    throw new Error("Must enter valid website");
  if (website.slice(-4) != ".com") throw new Error("Must enter valid website");
  if (website.length < 20) throw new Error("Must enter valid website");

  // Validate pricerange
  if (typeof priceRange != "string")
    throw new Error("Must provide a string price range");
  if (priceRange.trim().length == 0)
    throw new Error("Price range must not be only spaces");
  if (priceRange.length < 1 || priceRange.length > 4)
    throw new Error("Price range is too long");
  for (const i of priceRange.split("")) {
    if (i != "$") {
      throw new Error("Price range is not valid");
    }
  }

  // Validate cuisines
  if (!Array.isArray(cuisines))
    throw new Error("Must provide an array cuisines");
  if (cuisines.length < 1)
    throw new Error("Must provide an array with cuisines");
  for (const i of cuisines) {
    if (typeof i != "string")
      throw new Error("Must provide cuisines as strings");
    if (i.trim().length == 0)
      throw new Error("Cuisines can not be only spaces");
  }

  // Validate service options
  if (typeof serviceOptions != "object")
    throw new Error("Services options must be an object");
  for (const i in serviceOptions) {
    if (typeof serviceOptions[i] != "boolean")
      throw new Error("Service options must be booleans");
  }

  // Validate id
  if (typeof id != "string") throw new Error("Must provide a string id");
  if (id.trim().length == 0) throw new Error("Id must not be only spaces");
  let newId = objectID(id);
  if (!objectID.isValid(newId)) throw new Error("Id must be valid");

  const restaurantCollection = await restaurants();
  const oldRestaurant = await this.get(id);

  const newRest = {
    name: name,
    location: location,
    phoneNumber: phoneNumber,
    website: website,
    priceRange: priceRange,
    cuisines: cuisines,
    overallRating: oldRestaurant.overallRating,
    serviceOptions: serviceOptions,
    reviews: oldRestaurant.reviews,
  };

  const updatedInfo = restaurantCollection.replaceOne(
    { _id: objectID(id) },
    newRest
  );

  if (updatedInfo.modifiedCount === 0) {
    throw new Error("could not update post successfully");
  }

  return await this.get(id);
}

module.exports = {
  create,
  getAll,
  get,
  remove,
  update,
};
