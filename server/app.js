/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: app.js
*/

// DEPENDENCIES
import express from "express";
import mongoose from "mongoose";

const port = 3000;
const app = express();

// MODELS
import Blog from "./models/blog_model";
import Category from "./models/category_model";



// MONGOOOSE CONFIGURATION
mongoose.connect("mongodb://localhost/blogs", {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to database!");
});

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

// Blog.create({
//     title: "Walking the DOM",
//     content: "Just another walk in the park."
// })


// Category.updateOne({_id:"5ff0b52bf6185b5654d65cc6"}, {blogs: [{_id:"5ff0b52bf6185b5654d65cc9"}]}, () => {

// })

// Blog.updateOne({_id: "5ff0b52bf6185b5654d65cc9"}, {
//    cat: {_id:"5ff0b52bf6185b5654d65cc6"}
// }, () => {})

// ROUTES
app.get("/", (req, res) => {
    res.redirect()
});

// BLOG ROUTES

//retrieve all blogs
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(!err) {
            res.json(blogs)
        } else {
            console.log(err)
        }
    })
});

// retrieve blogs of category
app.get("/blogs/:name/:id", (req, res) => {
    const catId = req.params.id
    Category.findOne({_id: catId})
    .populate("blogs")
    .exec((err, cat) => {
        if(!err) {
            res.json(cat.blogs)
        } else {
            console.log(err)
        }
    })
});

// retrieve one blog
app.get("/blog/:title/:id", (req, res) => {
    // retrieve url information 
    const blogId = req.params.id
    // retrieve blog
    Blog.findOne({_id: blogId}, (err, blog) => {
        if(!err) {
            res.json(blog);
        } else {
            console.log(err)
        }
    })
});

// create a blog
app.post("/blogs/:blogid/:catid", (req, res) => {
    // retrieve url information 
    const blogId = req.params.blogid
    const catId = req.params.catid;

    // create blog
    // Blog.create({})

    // add blog to category in database
    //    Category.updateOne({_id: "5ff072b879796458a0278293"},
    //     {
    //         blogs: [
    //             {
    //                 _id: "5ff072b879796458a0278292"
    //             }
    //         ]
    //     },  (err, cat) => {
    // });
});

// update blog
app.put("/blogs/id", (req, res) => {

});

// delete blog
app.delete("/blogs/id", (req, res) => {

});



// CATEGORY ROUTES

// retrieve all categories
app.get("/categories", (req, res) => {
    Category.find({}, (err, cats) => {
        if(!err) {
            res.json(cats)
        } else {
            console.log(err)
        }
    })
});

// retrieve one category
app.get("/categories/:id", (req, res) => {
    // retrieve url information 
    const catId = req.params.id
    // retrieve category
    Category.findOne({_id: catId}, (err, cat) => {
        if(!err) {
            res.json(cat);
        } else {
            console.log(err)
        }
    })
});

// create category
app.post("/categories/id", (req, res) => {
    
});

// update category
app.put("/categories/id", (req, res) => {
    // retrieve url information
});

// delete category
app.delete("/categories/id", (req, res) => {

});

app.listen(port, () => console.log(`Server started on port: ${port}`));