const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const passport = require('passport');
const UserService = require('../services/userService');

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        async ({ id }, done) => {
            let user;

            try {
                user = await UserService.getById(id);
            } catch (e) {
                return done(e, false);
            }

            return done(null, user);
        }
    )
);

exports.jwt = passport.authenticate('jwt', { session: false });
