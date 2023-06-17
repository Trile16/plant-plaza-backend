const express = require("express");
const userPlantsRouter = express.Router();
const {
  getUserPlantsByUserId,
  addPlantToUser,
  removePlantFromUser,
} = require("../db/user_plants");
const { requireUser } = require("./utils");

userPlantsRouter.use("/", (req, res, next) => {
  console.log("Welcome to the userPlants router!");
  next();
});

// GET /api/user_plants/:userId
userPlantsRouter.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    const userPlants = await getUserPlantsByUserId(userId);

    res.send(userPlants);
  } catch (error) {
    next(error);
  }
});

// POST /api/user_plants/:userId
userPlantsRouter.post("/:userId", requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { plantId } = req.body;

    const userPlant = await addPlantToUser({ userId, plantId });

    res.send(userPlant);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/user_plants/:id
userPlantsRouter.delete("/:id", requireUser, async (req, res, next) => {
  try {
    const { id } = req.params;

    const removedPlant = await removePlantFromUser(id);

    res.send(removedPlant);
  } catch (error) {
    next(error);
  }
});

module.exports = userPlantsRouter;
