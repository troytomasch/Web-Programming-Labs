const mongoCollections = require("./../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
var objectID = require("mongodb").ObjectId;
const uuid = require("uuid");

async function create(
  restaurantId,
  title,
  reviewer,
  rating,
  dateofReview,
  review
) {
  // Validate restaurantId
  if (typeof restaurantId != "string")
    throw new Error("Must enter a string for restaurantId");
  if (restaurantId.trim().length == 0)
    throw new Error("RestaurantId must not only contain spaces");
  let newId = objectID(restaurantId);
  if (!objectID.isValid(newId)) throw new Error("Id must be valid");

  // Validate title
  if (typeof title != "string")
    throw new Error("Must enter a string for title");
  if (title.trim().length == 0)
    throw new Error("Title must not only contain spaces");

  // Validate reviewer
  if (typeof reviewer != "string")
    throw new Error("Must enter a string for reviewer");
  if (reviewer.trim().length == 0)
    throw new Error("Reviewer must not only contain spaces");

  // Validate rating
  if (typeof rating != "number")
    throw new Error("Must enter a number for rating");
  if (rating > 5 || rating < 1)
    throw new Error("Rating must be between 1 and 5");

  // Validate date
  if (typeof dateofReview != "string")
    throw new Error("Must enter a string for the date");
  const dateSplit = dateofReview.split("");
  for (var i = 0; i < dateSplit.length; i++) {
    if (i == 2 || i == 5) {
      if (dateSplit[i] != "/") {
        throw new Error("Date is invalid");
      }
    } else if (
      dateofReview.charCodeAt(i) < 48 ||
      dateofReview.charCodeAt(i) > 57
    ) {
      throw new Error("Date is invalid");
    }
  }
  const today = new Date();
  if (dateofReview.substr(0, 2) != today.getMonth() + 1) {
    throw new Error("Date of review must be current date");
  }
  if (dateofReview.substr(3, 2) != today.getDate()) {
    throw new Error("Date of review must be current date");
  }
  if (dateofReview.substr(6, 4) != today.getFullYear()) {
    throw new Error("Date of review must be current date");
  }

  // Validate review
  if (typeof review != "string")
    throw new Error("Must enter a string for review");
  if (review.trim().length == 0)
    throw new Error("Review must not only contain spaces");

  const restaurantCollection = await restaurants();
  let newReview = {
    _id: objectID(),
    title: title,
    reviewer: reviewer,
    rating: rating,
    dateofReview: dateofReview,
    review: review,
  };
  var restaurant = await restaurantCollection.findOne({ _id: newId });
  if (restaurant == null) throw new Error("Could not find restaurant with Id");
  restaurant.reviews.push(newReview);
  var sum = 0;
  for (var i of restaurant.reviews) {
    sum += i.rating;
  }
  restaurant.overallRating = sum / restaurant.reviews.length;

  const updatedInfo = await restaurantCollection.replaceOne(
    { _id: newId },
    restaurant
  );

  if (updatedInfo.modifiedCount === 0) {
    throw new Error("Could not add review successfully");
  }

  return newReview;
}

async function getAll(restaurantId) {
  // Validate restaurantId
  if (typeof restaurantId != "string")
    throw new Error("Must enter a string for restaurantId");
  if (restaurantId.trim().length == 0)
    throw new Error("RestaurantId must not only contain spaces");
  let newId = objectID(restaurantId);
  if (!objectID.isValid(newId)) throw new Error("Id must be valid");

  const restaurantCollection = await restaurants();
  var restaurant = await restaurantCollection.findOne({ _id: newId });
  return restaurant.reviews;
}

async function get(reviewId) {
  // Validate reviewId
  if (typeof reviewId != "string")
    throw new Error("Must enter a string for reviewId");
  if (reviewId.trim().length == 0)
    throw new Error("ReviewId must not only contain spaces");
  let newId = objectID(reviewId);
  if (!objectID.isValid(newId)) throw new Error("Id must be valid");

  const restaurantCollection = await restaurants();
  const allRestaurants = await restaurantCollection.find({}).toArray();
  for (var i of allRestaurants) {
    for (var j of i.reviews) {
      if (j._id == reviewId) {
        return j;
      }
    }
  }
  throw new Error("No review with this id");
}

async function remove(reviewId) {
  if (typeof reviewId != "string")
    throw new Error("Must enter a string for reviewId");
  if (reviewId.trim().length == 0)
    throw new Error("ReviewId must not only contain spaces");
  let newId = objectID(reviewId);
  if (!objectID.isValid(newId)) throw new Error("Id must be valid");

  const restaurantCollection = await restaurants();
  const allRestaurants = await restaurantCollection.find({}).toArray();
  for (var i of allRestaurants) {
    for (var j = 0; j < i.reviews.length; j++) {
      if (i.reviews[j]._id == reviewId) {
        var restaurant = i;
        restaurant.reviews.splice(j, 1);
        var sum = 0;
        for (var k of restaurant.reviews) {
          sum += k.rating;
        }
        if (restaurant.reviews.length == 0) {
          restaurant.overallRating = sum;
        } else {
          restaurant.overallRating = sum / restaurant.reviews.length;
        }
        const updatedInfo = await restaurantCollection.replaceOne(
          { _id: objectID(restaurant._id) },
          restaurant
        );

        if (updatedInfo.modifiedCount === 0) {
          throw new Error("could not update post successfully");
        }
        return;
      }
    }
  }
  throw new Error("No review with this id");
}

module.exports = {
  create,
  getAll,
  get,
  remove,
};
