/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: app.js
*/

// DEPENDENCIES
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import session from "express-session";
import passport from 'passport';
var LocalStrategy = require('passport-local').Strategy;
import cookieParser from "cookie-parser";

// ROUTES
import postRoutes from "./routes/post_routes";
import categoryRoutes from "./routes/category_routes";
import userRoutes from "./routes/user_routes";

// MODELS
import User from "./models/user_model";
import Post from "./models/post_model"
import Category from "./models/category_model"
// ENV VARIABLES
const PORT = 5000;

const app = express();

// MONGOOOSE CONFIGURATION
mongoose.connect("mongodb://localhost/blogs", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to database!");
});

// MIDDLEWARE 
app.use(cors());

// CONFIGURE PASSPORT 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'keyboard monkey',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// serialize user
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialize user 
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    err ? console.log(err) : done(err, user);

  });
});

// strategies
passport.use("local-login", new LocalStrategy({
  passReqToCallback: true
},
  function (req, username, password, done) {

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
    User.find({}, (err, users) => {
      if (!err) {
        users.forEach(user => {
          if (user.username !== username) {
            return err ? done(err) : done(null, req.user)

          } else {
            return done(null, false, { message: 'username taken.' });
          }
        })
      }
    })
  }
));

// User.create({ username: "dev", password: "grape", role: "administrator" }, () => { })
// Post.create({ title: "This is a new post", content: "this is some interesting content" })

// Category.updateOne({ _id: "5ff72375686fde2220c79e87" }, { posts: [{ _id: "5ff727fd1f62464118401221" }] }, () => { })
// User.create({ username: "jill", password: "grape" }, () => { })
// INITIALIZE ROUTES
app.use("/", userRoutes)
app.use("/posts", postRoutes);
app.use("/categories", categoryRoutes);


app
  .use(express.static(path.join(__dirname, '../build')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
