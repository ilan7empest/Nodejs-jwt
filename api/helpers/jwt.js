const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  issue: (payload, expiresIn) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  },
};
