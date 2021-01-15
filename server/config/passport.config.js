/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: passport.config.js
*/

// strategies
passport.use("local-login", new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
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
    }
));

passport.use("local-signup", new LocalStrategy({
    passReqToCallback: true
},
    (req, username, password, done) => {
        console.log(username)
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
    }
));