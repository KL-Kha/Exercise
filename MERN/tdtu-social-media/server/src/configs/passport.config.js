require('dotenv').config();

const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../api/v1/models/user.model');

function initialize(passport) {
    passport.use(
        'signup',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async (email, password, done) => {
                try {
                    const user = await UserModel.create({ email, password });

                    return done(null, user);
                } catch (error) {
                    done(error);
                }
            },
        ),
    );

    passport.use(
        'login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async (email, password, done) => {
                try {
                    const user = await UserModel.findOne({ email });

                    if (!user) {
                        return done(null, false, { message: 'User not found' });
                    }

                    const validate = await user.isValidPassword(password);

                    if (!validate) {
                        return done(null, false, { message: 'Wrong Password' });
                    }

                    return done(null, user, { message: 'Logged in Successfully' });
                } catch (error) {
                    return done(error);
                }
            },
        ),
    );

    passport.use(
        new JWTstrategy(
            {
                secretOrKey: 'TOP_SECRET',
                jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token'),
            },
            async (token, done) => {
                try {
                    return done(null, token.user);
                } catch (error) {
                    done(error);
                }
            },
        ),
    );

    // passport.use(
    //     new LocalStrategy((username, password, done) => {
    //         console.log('🚀 ~ file: passport.config.js ~ line 13 ~ passport.use ~ password', password);
    //         console.log('🚀 ~ file: passport.config.js ~ line 13 ~ passport.use ~ username', username);

    //         // validate if valid account
    //         // set account to passport session
    //         // true return done(null, {user infor})
    //         // false return done(null, false) return false because passport recommend that we should return false for the second param
    //     }),
    // );

    passport.use(
        new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
            passReqToCallback: true,
        }),

        async (request, accessToken, refreshToken, profile, done) => {
            try {
                console.log(
                    '🚀 ~ file: passport.config.js ~ line 97 ~ request, accessToken, refreshToken, profile, done',
                    request,
                    accessToken,
                    refreshToken,
                    profile,
                    done,
                );

                let existingUser = await User.findOne({ 'google.id': profile.id });
                // if user exists return the user
                if (existingUser) {
                    return done(null, existingUser);
                }
                // // if user does not exist create a new user
                // console.log('Creating new user...');
                // const newUser = new User({
                //     method: 'google',
                //     google: {
                //         id: profile.id,
                //         name: profile.displayName,
                //         email: profile.emails[0].value,
                //     },
                // });
                // await newUser.save();
                return done(null, {});
            } catch (error) {
                return done(error, false);
            }
        },
    );
}

module.exports = initialize;
