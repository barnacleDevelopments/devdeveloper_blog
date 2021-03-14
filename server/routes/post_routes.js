/*
AUTHOR: Devin Davis
DATE: January 3st, 2021
FILE: post_routes.js
*/

// DEPENDENCIES
import express from "express";
import * as yup from "yup";
import cors from "cors";

// MODELS
import Post from "../models/post_model";
import Category from "../models/category_model";
import jwtCheck from "../configuration/json_web_token.config";

// CORS CONGIGURATION
import { adminCorsOptions, userCorsOptions, guestCorsOptions } from "../configuration/cors/cors_config"

/*
=================
POST ROUTES
=================
*/
const router = express.Router();
//retrieve all posts
router.get("/", (req, res) => {
    Post.find({}, (err, blogs) => {
        if (!err) {
            res.json({ data: blogs, status: "success" })
        } else {
            console.log(err)
            res.send({
                status: "error",
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
            res.json({ data: blog, status: "success" });
        } else {
            console.log(err)
            res.send({
                status: "error",
                message: "Failed to find item in database."
            })
        }
    })
});

// create one post 
router.post("/create/:catId", jwtCheck, (req, res) => {
    if (req.user.role === "administrator") {
        const body = req.body;
        const catId = req.params.catId;

        let newPostSchema = yup.object().shape({
            title: yup.string().required().min(5).max(15),
            content: yup.string().required().min(50).max(1000)
        });

        newPostSchema.validate(body)
            .then(() => {
                Post.create(body, (err, post) => {
                    if (!err) {
                        Category.findOne({ _id: catId }, (err, cat) => {
                            if (!err) {
                                let newPostArr = cat.posts
                                newPostArr.push(post._id)
                                Category.findByIdAndUpdate(catId, { posts: newPostArr }, (err, cat) => {
                                    if (!err) {
                                        res.json({ data: post, status: "success" })
                                        console.log(`Category with id: ${cat._id} recieved a new post with id ${post._id}`)
                                    } else {
                                        console.log(err)
                                        res.json({
                                            status: "error",
                                            message: "Failed to update item in database."
                                        })
                                    }
                                })
                            } else {
                                console.log(err)
                                res.json({
                                    status: "error",
                                    message: "Failed to find item in database."
                                })
                            }
                        })
                        console.log(`Post created! It's id is: ${post._id}`)
                    } else {
                        console.log(err)
                        res.json({
                            status: "error",
                            message: "Failed to add item to database."
                        })
                    }
                })
            }).catch((err) => {
                console.log(err.errors[0])
                res.json({ status: "error", message: err.errors[0] })
            })
    } else {
        res.redirect("/")
    }

});

// update one post
router.put("/update/:id", jwtCheck, (req, res) => {
    if (req.user.role === "administrator") {
        const body = req.body;
        const id = req.params.id;
        Post.findByIdAndUpdate(id, body, {
            new: true
        }, (err, post) => {
            if (!err) {
                console.log(`Post updated! It's id is: ${post._id}`)
                res.json({ data: post, status: "success" })
            } else {
                console.log(err)
                res.send({
                    status: "failure",
                    message: "Failed to update item in database."
                })
            }
        })
    } else {
        res.redirect("/")
    }
});

// delete one post
router.delete("/delete/:postId/:catId", jwtCheck, (req, res) => {
    if (req.user.role === "administrator") {
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
                                res.json({
                                    status: "success",
                                    message: "Removed item from database."
                                })
                            } else {
                                console.log(err)
                                res.json({
                                    status: "failure",
                                    message: "Failed to update item in database."
                                })
                            }
                        })
                    } else {
                        console.log(err)
                        res.json({
                            status: "failure",
                            message: "Failed to find item in database."
                        })
                    }
                })
            } else {
                console.log(err)
                res.json({
                    status: "failure",
                    message: "Failed to delete item in database."
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

export default router;