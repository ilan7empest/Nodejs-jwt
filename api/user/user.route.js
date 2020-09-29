const router = require("express").Router();
const userController = require("./user.controller");

router
  .post("/signup", userController.signup)
  .post("/login", userController.login);

module.exports = router;
