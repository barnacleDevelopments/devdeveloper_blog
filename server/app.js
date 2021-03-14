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
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

// ROUTES
import postRoutes from "./routes/post_routes";
import categoryRoutes from "./routes/category_routes";
import commentRoutes from "./routes/comment_routes"

// ENV VARIABLES
const PORT = process.env.PORT;

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
      "default-src": ["'self'", "https://dev-qkxpd7xc.auth0.com/"],
      "script-src": ["'self'", "'unsafe-eval'", "*.fontawesome.com/", "https://dev-qkxpd7xc.auth0.com/"],
      "script-src-elem": ["'self'", "*.fontawesome.com/", "https://dev-qkxpd7xc.auth0.com/"],
      "connect-src": ["'self'", "*.fontawesome.com/", "https://dev-qkxpd7xc.auth0.com/"],
      "style-src": ["'self'", "'unsafe-inline'", "*.fontawesome.com/", "https://dev-qkxpd7xc.auth0.com/"],
      "font-src": ["'self'", "*.fontawesome.com/", "https://dev-qkxpd7xc.auth0.com/"],
      "img-src": ["'self'", "data:", "'unsafe-eval'", "'unsafe-inline'", "https://dev-qkxpd7xc.auth0.com/"]
    },
    frameguard: "deny"
  }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ++++++++++++++++++
// INITIALIZE ROUTES
// ++++++++++++++++++
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
