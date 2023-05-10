const express = require("express");
const router = express.Router();
const data = require("../data");
const reviewData = data.reviews;
const restaurantData = data.resturants;
var objectID = require("mongodb").ObjectId;

router.get("/review/:id", async (req, res) => {
  let reviewId = req.params.id;
  if (typeof reviewId != "string") {
    res.status(400).json({ error: "Must enter a string for reviewId" });
    return;
  }
  if (reviewId.trim().length == 0) {
    res.status(400).json({ error: "ReviewId must not only contain spaces" });
    return;
  }
  let newId = objectID(reviewId);
  if (!objectID.isValid(newId)) {
    res.status(400).json({ error: "Id must be valid" });
    return;
  }
  try {
    const review = await reviewData.get(reviewId);
    res.json(review);
  } catch (e) {
    res.sendStatus(404).json({ error: "Review not found" });
  }
});

router.post("/:id", async (req, res) => {
  const restaurantId = req.params.id;
  const inputReview = req.body;
  // Validate restaurantId
  if (typeof restaurantId != "string") {
    res.status(400).json({ error: "Must enter a string for restaurantId" });
    return;
  }
  if (restaurantId.trim().length == 0) {
    res
      .status(400)
      .json({ error: "RestaurantId must not only contain spaces" });
    return;
  }
  let newId = objectID(restaurantId);
  if (!objectID.isValid(newId)) {
    res.status(400).json({ error: "Id must be valid" });
    return;
  }

  // Validate title
  if (typeof inputReview.title != "string") {
    res.status(400).json({ error: "Must enter a string for title" });
    return;
  }
  if (inputReview.title.trim().length == 0) {
    res.status(400).json({ error: "Title must not only contain spaces" });
    return;
  }

  // Validate reviewer
  if (typeof inputReview.reviewer != "string") {
    res.status(400).json({ error: "Must enter a string for reviewer" });
    return;
  }
  if (inputReview.reviewer.trim().length == 0) {
    res.status(400).json({ error: "Reviewer must not only contain spaces" });
    return;
  }

  // Validate rating
  if (typeof inputReview.rating != "number") {
    res.status(400).json({ error: "Must enter a number for rating" });
    return;
  }
  if (inputReview.rating > 5 || inputReview.rating < 1) {
    res.status(400).json({ error: "Rating must be between 1 and 5" });
    return;
  }

  // Validate date
  if (typeof inputReview.dateofReview != "string") {
    res.status(400).json({ error: "Must enter a string for the date" });
    return;
  }
  const dateSplit = inputReview.dateofReview.split("");
  for (var i = 0; i < dateSplit.length; i++) {
    if (i == 2 || i == 5) {
      if (dateSplit[i] != "/") {
        res.status(400).json({ error: "Date is invalid" });
        return;
      }
    } else if (
      inputReview.dateofReview.charCodeAt(i) < 48 ||
      inputReview.dateofReview.charCodeAt(i) > 57
    ) {
      res.status(400).json({ error: "Date is invalid" });
      return;
    }
  }
  const today = new Date();
  if (inputReview.dateofReview.substr(0, 2) != today.getMonth() + 1) {
    {
      res.status(400).json({ error: "Date of review must be current date" });
      return;
    }
  }
  if (inputReview.dateofReview.substr(3, 2) != today.getDate()) {
    {
      res.status(400).json({ error: "Date of review must be current date" });
      return;
    }
  }
  if (inputReview.dateofReview.substr(6, 4) != today.getFullYear()) {
    {
      res.status(400).json({ error: "Date of review must be current date" });
      return;
    }
  }

  // Validate review
  if (typeof inputReview.review != "string") {
    res.status(400).json({ error: "Must enter a string for review" });
    return;
  }
  if (inputReview.review.trim().length == 0) {
    res.status(400).json({ error: "Review must not only contain spaces" });
    return;
  }

  try {
    const newReview = await reviewData.create(
      restaurantId,
      inputReview.title,
      inputReview.reviewer,
      inputReview.rating,
      inputReview.dateofReview,
      inputReview.review
    );
    const restaurant = await restaurantData.get(restaurantId);
    res.json(restaurant);
  } catch (e) {
    res.status(404).json({ error: "Restaurant not found" });
  }
});

router.get("/:id", async (req, res) => {
  const restaurantId = req.params.id;
  // Validate restaurantId
  if (typeof restaurantId != "string") {
    res.status(400).json({ error: "Must enter a string for restaurantId" });
    return;
  }
  if (restaurantId.trim().length == 0) {
    res
      .status(400)
      .json({ error: "RestaurantId must not only contain spaces" });
    return;
  }
  let newId = objectID(restaurantId);
  if (!objectID.isValid(newId)) {
    res.status(400).json({ error: "Id must be valid" });
    return;
  }

  try {
    const reviews = await reviewData.getAll(restaurantId);
    if (reviews.length == 0) {
      res.status(404).json({ error: "No reviews" });
      return;
    }
    res.json(reviews);
  } catch (e) {
    res.status(404).json({ error: "No restaurant found" });
  }
});

router.delete("/:id", async (req, res) => {
  let reviewId = req.params.id;
  if (typeof reviewId != "string") {
    res.status(400).json({ error: "Must enter a string for reviewId" });
    return;
  }
  if (reviewId.trim().length == 0) {
    res.status(400).json({ error: "ReviewId must not only contain spaces" });
    return;
  }
  let newId = objectID(reviewId);
  if (!objectID.isValid(newId)) {
    res.status(400).json({ error: "Id must be valid" });
    return;
  }
  try {
    await reviewData.remove(reviewId);
    res.json({ reviewId: reviewId, deleted: true });
  } catch (e) {
    res.status(404).json({ error: "Review not found" });
  }
});

module.exports = router;
