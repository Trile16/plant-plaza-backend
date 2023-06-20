const express = require("express");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByUsername } = require("../db/users");

// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      next({
        name: "User Exists Error",
        message: "A user by that email already exists",
      });
    }

    const user = await createUser({
      firstName,
      lastName,
      username,
      password,
    });

    const token = jwt.sign(
      {
        id: user.id,
        user: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      success: true,
      data: { message: "Thank you for signing up", token },
      error: null,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      next({
        name: "Missing Credentials Error",
        message: "Please supply both a username and password",
      });
    }

    const user = await getUserByUsername(username);

    if (!user) {
      next({
        name: "Incorrect Credentials",
        message: "Username or password is incorrect.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: user.id,
          user: username,
        },
        process.env.JWT_SECRET
      );
      res.send({
        success: true,
        data: { message: "You're logged in!", token: token },
        error: null,
      });
    } else {
      next({
        name: "Incorrect Credentials Error",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
