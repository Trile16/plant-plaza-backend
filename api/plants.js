const express = require("express");
const plantsRouter = express.Router();
const { requireUser } = require("./utils");
const { getPlants, getPlantById } = require("../db/plants");

plantsRouter.use("/", (req, res, next) => {
  console.log("Welcome to the Plant Route!");
  next();
});

// GET /api/plants
plantsRouter.get("/", async (req, res, next) => {
  try {
    const plants = await getPlants();

    res.send(plants);
  } catch (error) {
    next(error);
  }
});

// GET /api/plants/:id
plantsRouter.get("/:id", async (req, res, next) => {
  try {
    const plant = await getPlantById(req.params.id);

    res.send(plant);
  } catch (error) {
    next(error);
  }
});

module.exports = plantsRouter;
