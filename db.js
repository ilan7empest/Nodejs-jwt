const mongoose = require("mongoose");
const db = mongoose.connection;
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  const app = require("./app");
  app.listen(process.env.PORT || 8080, () => console.log("Connected"));
});
