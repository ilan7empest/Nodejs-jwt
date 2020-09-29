const jwt = require("../helpers/jwt");
const User = require("./user.model");

module.exports = {
  signup: async (req, res, next) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(403).json({ error: "Email already exists" });
    } else {
      try {
        const validUser = await User.validateSignup(req.body);
        User.create(validUser).then(() => {
          res.status(200).json({ success: "User Created" });
        });
      } catch (err) {
        res.json(err);
      }
    }
  },

  login: async (req, res, next) => {
    try {
      const validUser = await User.validateLogin(req.body);
      const user = await User.findOne({ email: validUser.email });
      if (!user) {
        return res.status(401).json({ error: "Unauthorized User" });
      }
      if (!user.isValidPassword(validUser.password)) {
        return res.status(401).json({ error: "Incorrect Password" });
      }

      const token = jwt.issue({ id: user._id }, "1d");
      return res.status(200).json({
        token: token,
      });
    } catch (err) {
      const error = new Error("Failed to Login");
      error.status = 500;
      throw error;
    }
  },
};
