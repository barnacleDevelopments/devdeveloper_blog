/*
AUTHOR: Devin Davis
DATE: January 15th, 2021
FILE: passport.config.js
*/

// DEPENDENCIES
import passport from 'passport';
var LocalStrategy = require('passport-local').Strategy;
import User from "../models/user_model";

// VALIDATION SCHEMAS 
import userValSchema from "../validation_schemas/user_shema";

// strategies
const useStrategies = () => {
    passport.use("local-login", new LocalStrategy({
        passReqToCallback: true
    },
        (req, username, password, done) => {
            const userData = { username: username, password: password }
            // validate user input
            userValSchema.isValid(userData)
                .then((valid) => {
                    if (valid) {
                        // locate user in database
                        User.findOne({ username: username }, (err, user) => {
                            if (err) { return done(err); }
                            if (!user) {
                                return done(null, false, { message: 'Incorrect username.' });
                            }
                            if (!user.validPassword(password)) {
                                return done(null, false, { message: 'Incorrect password.' });
                            }
                            return done(null, user);
                        });
                    } else {
                        console.log("invalid login")
                    }

                })
        }
    ));

    passport.use("local-signup", new LocalStrategy({
        passReqToCallback: true
    },
        (req, username, password, done) => {
            const userData = { username: username, password: password }
            // validate user input
            userValSchema.isValid(userData)
                .then((valid) => {
                    if (valid) {
                        // get all the users
                        User.find({}, (err, users) => {
                            if (err) {
                                return done(err);
                            }
                            if (!err) {
                                let userExists = false;
                                // check if the users exists 
                                users.forEach(user => {
                                    user.username === username ? userExists = true : null
                                })
                                // if user does not exist create new user
                                if (!userExists) {
                                    User.create({ username: username, password: password }, (err, user) => {
                                        console.log(`New user with id: ${user._id}!`)
                                        return err ? done(err) : done(null, user)
                                    });

                                } else {
                                    return done(null, false, { message: 'username taken.' });
                                }
                            }
                        })
                    } else {
                        console.log("invalid signup")
                    }
                });

        }
    ))
}

export default useStrategies;