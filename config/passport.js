const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'secreto_super_seguro'
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const author = await db.Author.findByPk(jwt_payload.id);
        if (author) {
          return done(null, author);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};2