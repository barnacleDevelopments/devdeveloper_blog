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
        if(!err) {
            res.json(blogs)
        } else {
            console.log(err)
        }
    })
});


// retrieve one post
router.get("/:id", (req, res) => {
    const blogId = req.params.id  // retrieve url information 
    Post.findOne({_id: blogId}, (err, blog) => {  // retrieve post
        if(!err) {
            res.json(blog);
        } else {
            console.log(err)
        }
    })
});

// create one post 
router.post("/create/:id", (req, res) => {
    const body = req.body;
    const catId = req.params.id;
    Post.create(body, (err, post) => {
        if(!err) {
            Category.findOne({_id: catId}, (err, cat) => {
                if(!err) {
                    let newPostArr = cat.posts
                    newPostArr.push(post._id)
                    Category.findOneAndUpdate({_id: catId}, {posts: newPostArr}, (err, cat) => {
                        err ? console.log(err) : console.log(`Category with id: ${cat._id} recieved a new post with id ${post._id}`)
                    })
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
    Post.findOneAndUpdate({_id: id}, body, (err, post) => {
        err ? console.log(err) : console.log(`Post with id: ${post._id} updated!`)
    })

});

// delete one post
router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    Post.findOneAndDelete({_id: id}, (err, post) => {
        if(!err) {
            console.log(`Post with id: ${post._id} deleted!`)
            Category.findOne({_id: post.catId}, (err, cat) => {
                if(!err) {
                    let posts = cat.posts.filter((postId) => {
                        postId === id ? false : true; 
                    })
                    Category.findByIdAndUpdate({_id: post.catId }, {posts: posts}, (err, cat) => {
                        console.log(`Category with id: ${cat._id} posts updated!`)
                    })
                }
            })
 
        } else {
            console.log(err)
        }
       
    })
})

export default router;