const reviewRoutes = require("./reviews");
const restaurantRoutes = require("./restaurants");

const constructorMethod = (app) => {
  app.use("/reviews", reviewRoutes);
  app.use("/restaurants", restaurantRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
