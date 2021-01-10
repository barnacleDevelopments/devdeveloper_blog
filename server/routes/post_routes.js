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
                        err ? console.log(err) : (
                            console.log(`Category with id: ${cat._id} recieved a new post with id ${post._id}`)

                        )
                    })
                    res.json(post)
                }
            })
            console.log(`Post created! It's id is: ${post._id}`)
        } else {
            console.log(err)
        }
    })
});

// update one post
router.put("/update/:id", (req, res) => {
    const body = req.body;
    const id = req.params.id;
    Post.findOneAndUpdate({ _id: id }, body, (err, post) => {
        if (!err) {
            res.json(post)
        } else {
            console.log(err)
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
                    console.log(cat.posts)
                    // filter out deleted post
                    let posts = cat.posts.filter((id) => {
                        return id === postId ? false : true;
                    })
                    console.log(posts)
                    // update category's posts
                    Category.findByIdAndUpdate(catId, { posts: posts }, (err, cat) => {
                        if (!err) {
                            console.log(`Category with id: ${cat._id} posts updated!`)
                        } else {
                            console.log(err)
                        }

                    })
                }
            })
        } else {
            console.log(err)
        }

    })
})

export default router;