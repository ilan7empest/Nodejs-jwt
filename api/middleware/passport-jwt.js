const passport = require("passport");
const JWTStrategy = require("passport-jwt");
const User = require("../user/user.model");
require("dotenv").config();

const configJWTStrategy = () => {
  passport.use(
    new JWTStrategy.Strategy(
      {
        jwtFromRequest: JWTStrategy.ExtractJwt.fromHeader("authorization"),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        console.log(payload);
        try {
          const user = await User.findOne({ id: payload._id });
          if (!user) {
            return done(null, false);
          }
          return done(null, {
            id: user._id,
          });
        } catch (error) {
          done(error, false);
        }
      }
    )
  );
};

module.exports = configJWTStrategy;
