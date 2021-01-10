/*
AUTHOR: Devin Davis
DATE: January 3st, 2021
FILE: comment_routes.js
*/

import express from "express";
const router = express.Router();

// MODELS
import Comment from "../models/comment_model";
import Post from "../models/post_model";
import User from "../models/user_model";

// CATEGORY ROUTES

// retrieve all comments
router.get("/", (req, res) => {
    Comment.find({}, (err, coms) => {
        err ? console.log(err) : res.json(coms)
    })
});

// retrieve one comment
router.get("/:id", (req, res) => {
    const comId = req.params.id;
    Comment.findOne({ _id: comId }, (err, com) => {
        err ? console.log(err) : res.json(com);
    });
});

// retrieve post's comments
router.get("/post/:id", (req, res) => {
    let postId = req.params.id
    Post.findById(postId).populate({ path: "comments", populate: { path: "userId" } }).exec((err, post) => {
        console.log(post)
        res.json(post.comments.reverse())
    })
})

// create one comment
router.post("/create/:userId/:postId", (req, res) => {
    const body = req.body;
    const userId = req.params.userId;
    const postId = req.params.postId;
    // create new comment 
    Comment.create(body, (err, com) => {
        if (!err) {
            // find associated user
            User.findById(userId, (err, user) => {
                if (!err) {
                    // update user's comment list
                    let newUserCommentList = user.comments;
                    newUserCommentList.push(com._id);
                    User.findByIdAndUpdate(userId, { comments: newUserCommentList }, (err, user) => {
                        if (!err) {
                            // find associated post
                            Post.findById(postId, (err, post) => {
                                if (!err) {
                                    // update post's comment list
                                    let newCommentList = post.comments;
                                    newCommentList.push(com._id);
                                    Post.findByIdAndUpdate(postId,
                                        { comments: newCommentList })
                                        .populate("comments")
                                        .exec((err, post) => {
                                            if (!err) {
                                                console.log(post)
                                                res.json(post.comments.reverse())
                                            } else {
                                                console.log(err)
                                            }
                                        });
                                } else {
                                    console.log(err);
                                }
                            });
                        } else {
                            console.log(err);
                        }
                    });
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    });
});

// update one comment
router.put("/update/:id", (req, res) => {
    const body = req.body;
    const id = req.params.id;
    Comment.findOneAndUpdate({ _id: id }, body, (err, com) => {
        err ? console.log(err) : (
            console.log(`Comment with id: ${com._id} updated!`)
        )
    })

});

// delete one comment
router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    Comment.findOneAndDelete({ _id: id }, (err, com) => {
        err ? console.log(err) : (
            console.log(`Comment with id: ${id} deleted!`)
        )
    })
})

export default router;