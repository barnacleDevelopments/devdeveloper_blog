/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: app.js
*/

// ENV VARIABLES
const port = 3000;

// DEPENDENCIES
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

// ROUTES
import postRoutes from "./routes/post_routes";
import categoryRoutes from "./routes/category_routes";

import Post from "./models/post_model";
import Category from "./models/category_model";

// CLASSES 
import EasyDate from "./classes/EasyDate";

const app = express();

// MONGOOOSE CONFIGURATION
mongoose.connect("mongodb://localhost/blogs", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to database!");
});

// MIDDLEWARE 
app.use(bodyParser.json());
app.use(cors());
// INITIALIZE ROUTES
app.use("/posts", postRoutes);
app.use("/categories", categoryRoutes);



// Category.create({
//     name: "web develoment",
//     desc: "All things web development.",
// })

// Category.create({
//     name: "fitness",
//     desc: "All things fitness.",
// })

// Category.create({
//     name: "random",
//     desc: "Random tangents I find myself on.",
// })

// Post.create({
//     title: "Depression is more than you think",
//     content: "Oh really?.",
//     date: EasyDate.prototype.getRegDate()
// })


Category.updateOne({_id:"5ff372762f4df76a7c601a09"}, {posts: [{_id:"5ff372f05a7003726414eee9"}]}, () => {

})

// Category.updateOne({_id:"5ff0b52bf6185b5654d65cc8"}, {blogs: [{_id:"5ff22b4cd4936a19e0461be1"}, {_id: "5ff22df6130cb155e8b042a6" }]}, () => {

// })



// Blog.updateOne({_id: "5ff0b52bf6185b5654d65cc9"}, {
//    cat: {_id:"5ff0b52bf6185b5654d65cc6"}
// }, () => {})

app.get("/", (req, res) => {
    res.redirect()
});

app.listen(port, () => console.log(`Server started on port: ${port}`));