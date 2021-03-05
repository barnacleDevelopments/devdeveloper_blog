/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: app.js
*/

// DEPENDENCIES
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import session from "express-session";
import passport from 'passport';
import helmet from "helmet";

// ROUTES
import postRoutes from "./routes/post_routes";
import categoryRoutes from "./routes/category_routes";
import userRoutes from "./routes/user_routes";
import commentRoutes from "./routes/comment_routes"

// MODELS
import User from "./models/user_model";

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

// CROSS ORGIN REQUEST SETTINGS
app.use(cors({
  origin: "http://localhost:5000",
}));

// +++++++++++++++
// MIDDLEWARE 
// +++++++++++++++

// SET HTTP HEADERS
// content security policy
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-eval'", "*.fontawesome.com/"],
      "script-src-elem": ["'self'", "*.fontawesome.com/"],
      "connect-src": ["'self'", "*.fontawesome.com/"],
      "style-src": ["'self'", "'unsafe-inline'", "*.fontawesome.com/"],
      "font-src": ["'self'", "*.fontawesome.com/"],
      "img-src": ["'self'", "data:", "'unsafe-eval'", "'unsafe-inline'"]
    },
    frameguard: "deny"
  }
}))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EXPRESS SESSION
var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: "session",
  secret: '4t@fy',
  resave: false,
  saveUninitialized: false,
  // cookie: {
  //   secure: true,
  //   httpOnly: true,
  //   domain: 'example.com',
  //   path: 'foo/bar',
  //   expires: expiryDate
  // }
})); //

// +++++++++++++++++++
// CONFIGURE PASSPORT 
// +++++++++++++++++++
// STRATEGIES
passport.use(User.createStrategy())

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());// serialize user
passport.deserializeUser(User.deserializeUser()); // deserialize user 

// ++++++++++++++++++
// INITIALIZE ROUTES
// ++++++++++++++++++
app.use("/", userRoutes)
app.use("/posts", postRoutes);
app.use("/categories", categoryRoutes);
app.use("/comments", commentRoutes)

// SEND BUNDLE TO BROWSER
app
  .use(express.static(path.join(__dirname, '../build')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});
