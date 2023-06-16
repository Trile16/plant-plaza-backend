const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Our user Id:-----", id);
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

const plantsRouter = require("./plants");
apiRouter.use("/plants", plantsRouter);

apiRouter.get("/", (req, res) => {
  res.send("Hello world");
});

module.exports = apiRouter;
