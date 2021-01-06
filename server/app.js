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

// ROUTES
import postRoutes from "./routes/post_routes";
import categoryRoutes from "./routes/category_routes";

// ENV VARIABLES
const PORT = process.env.PORT || 5000;

const app = express();

// MONGOOOSE CONFIGURATION
mongoose.connect("mongodb://localhost/blogs", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to database!");
});

// MIDDLEWARE 
app.use(bodyParser.json());
app.use(cors());
// INITIALIZE ROUTES
app.use("/posts", postRoutes);
app.use("/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.redirect()
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
