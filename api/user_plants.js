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

// GET /api/user_plants
userPlantsRouter.get("/", requireUser, async (req, res, next) => {
  try {
    console.log(req.user, "REQ.USER");

    const userPlants = await getUserPlantsByUserId(req.user.id);

    console.log(userPlants);

    if (!userPlants) {
      next({
        name: "User Plants not found!",
        message: "No plants found for the user",
      });
    } else {
      res.send({
        success: true,
        data: {
          id: req.user.id,
          firstName: req.user.firstName,
          lastName: req.user.lastName,
          username: req.user.username,
          plants: userPlants,
        },
        error: null,
      });
    }
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
    console.log(userPlant);

    if (!userPlant) {
      next({
        name: "Add Plant to User Error",
        message:
          "Error adding plant to user (may already be added) or plantId may not exist.",
      });
    } else {
      res.send({ success: true, data: userPlant, error: null });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/user_plants
userPlantsRouter.delete("/", requireUser, async (req, res, next) => {
  try {
    const { plantId } = req.body;
    const userId = req.user.id;

    const removedPlant = await removePlantFromUser({ userId, plantId });

    if (!removedPlant) {
      next({
        name: "User Plant Not Found",
        message: "No plant found from the user to be deleted",
      });
    } else {
      res.send({ success: true, data: removedPlant, error: null });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = userPlantsRouter;
