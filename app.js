const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const configJWTStrategy = require("./api/middleware/passport-jwt");
const restRouter = require("./api/route-index");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
configJWTStrategy();
app.use("/api", restRouter);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.message = "Invalid Route";
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({ error: { message: error.message } });
});

module.exports = app;
