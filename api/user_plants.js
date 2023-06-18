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

// POST /api/user_plants
userPlantsRouter.post("/", requireUser, async (req, res, next) => {
  try {
    console.log(req.user);
    const userId = req.user.id;
    const { plantId } = req.body;

    const userPlant = await addPlantToUser({ userId, plantId });

    res.send(userPlant);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/user_plants
userPlantsRouter.delete("/", requireUser, async (req, res, next) => {
  try {
    const { userPlantId } = req.body;

    const removedPlant = await removePlantFromUser(userPlantId);

    console.log(removedPlant);

    res.send(removedPlant);
  } catch (error) {
    next(error);
  }
});

module.exports = userPlantsRouter;
