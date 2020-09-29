const restRouter = require("express").Router();
const userRouter = require("./user/user.route");
const passport = require("passport");

restRouter.use("/users", userRouter);

restRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req);
    res.send("Hello");
  }
);

module.exports = restRouter;
