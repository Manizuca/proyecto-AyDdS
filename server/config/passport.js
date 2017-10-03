// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var LocalStrategySequelize = require('passport-local-sequelize');

// expose this function to our app using module.exports
module.exports = function(passport, userModel) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    LocalStrategySequelize.attachToUser(userModel, {
        usernameField: 'email',
        digest: 'sha256'
    });

    passport.use(userModel.createStrategy());
    passport.serializeUser(userModel.serializeUser());
    passport.deserializeUser(userModel.deserializeUser());

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        }, (req, email, password, done) => {
            userModel.findByUsername(email, (err, existingUser) => {
                if (err) {
                    return done(err);
                }
                if (existingUser) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    userModel.register(email, password, (err, registeredUser) => {
                        if (err) {
                            return done(err);
                        }
                        return done(null, registeredUser);
                    });
                }
            });
        }));
};
