/*
AUTHOR: Devin Davis
DATE: January 3st, 2021
FILE: post_routes.js
*/

import express from "express";

// MODELS
import Post from "../models/post_model";
import Category from "../models/category_model";

const router = express.Router();

/*
=================
POST ROUTES
=================
*/

//retrieve all posts
router.get("/", (req, res) => {
    Post.find({}, (err, blogs) => {
        if (!err) {
            res.json(blogs)
        } else {
            console.log(err)
            res.send({
                status: "failure",
                message: "Failed to find items in database."
            })
        }
    })
});


// retrieve one post
router.get("/:id", (req, res) => {
    const blogId = req.params.id  // retrieve url information 
    Post.findOne({ _id: blogId }, (err, blog) => {  // retrieve post
        if (!err) {
            res.json(blog);
        } else {
            console.log(err)
            res.send({
                status: "failure",
                message: "Failed to find item in database."
            })
        }
    })
});

// create one post 
router.post("/create/:catId", (req, res) => {
    const body = req.body;
    const catId = req.params.catId;
    Post.create(body, (err, post) => {
        if (!err) {
            Category.findOne({ _id: catId }, (err, cat) => {
                if (!err) {
                    let newPostArr = cat.posts
                    newPostArr.push(post._id)
                    Category.findByIdAndUpdate(catId, { posts: newPostArr }, (err, cat) => {
                        if (!err) {
                            console.log(`Category with id: ${cat._id} recieved a new post with id ${post._id}`)
                            res.send({
                                status: "success",
                                message: "Added item to database."
                            })
                        } else {
                            console.log(err)
                            res.send({
                                status: "failure",
                                message: "Failed to update item in database."
                            })
                        }
                    })
                } else {
                    console.log(err)
                    res.send({
                        status: "failure",
                        message: "Failed to find item in database."
                    })
                }
            })
            console.log(`Post created! It's id is: ${post._id}`)
        } else {
            console.log(err)
            res.send({
                status: "failure",
                message: "Failed to add item to database."
            })
        }
    })
});

// update one post
router.put("/update/:id", (req, res) => {
    const body = req.body;
    const id = req.params.id;
    Post.findOneAndUpdate({ _id: id }, body, (err, post) => {
        if (!err) {
            console.log(`Post updated! It's id is: ${post._id}`)
            res.send({
                status: "success",
                message: "Updated item in database"
            })
        } else {
            console.log(err)
            res.send({
                status: "failure",
                message: "Failed to update item in database."
            })
        }
    })
});

// delete one post
router.delete("/delete/:postId/:catId", (req, res) => {
    const postId = req.params.postId;
    const catId = req.params.catId
    Post.findOneAndDelete({ _id: postId }, (err, post) => {
        if (!err) {
            console.log(`Post with id: ${post._id} deleted!`)
            // retrieve posts of post's category
            Category.findById(catId, (err, cat) => {
                if (!err) {
                    // filter out deleted post
                    let posts = cat.posts.filter((id) => {
                        return id === postId ? false : true;
                    })
                    // update category's posts
                    Category.findByIdAndUpdate(catId, { posts: posts }, (err, cat) => {
                        if (!err) {
                            console.log(`Category with id: ${cat._id} posts updated!`)
                            res.send({
                                status: "success",
                                message: "Removed item from database."
                            })
                        } else {
                            console.log(err)
                            res.send({
                                status: "failure",
                                message: "Failed to update item in database."
                            })
                        }
                    })
                } else {
                    console.log(err)
                    res.send({
                        status: "failure",
                        message: "Failed to find item in database."
                    })
                }
            })
        } else {
            console.log(err)
            res.send({
                status: "failure",
                message: "Failed to delete item in database."
            })
        }
    })
})

export default router;