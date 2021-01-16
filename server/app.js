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

import cookieParser from "cookie-parser";

// LOCAL STRATEGIES
import useStrategies from "./config/passport_strategies";

// ROUTES
import postRoutes from "./routes/post_routes";
import categoryRoutes from "./routes/category_routes";
import userRoutes from "./routes/user_routes";
import commentRoutes from "./routes/comment_routes"

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

// initialize strategies
useStrategies();

// User.create({ username: "devin1984", password: "grapeness", role: "administrator" }, () => {

// })

// INITIALIZE ROUTES
app.use("/", userRoutes)
app.use("/posts", postRoutes);
app.use("/categories", categoryRoutes);
app.use("/comments", commentRoutes)


app
  .use(express.static(path.join(__dirname, './build')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});
