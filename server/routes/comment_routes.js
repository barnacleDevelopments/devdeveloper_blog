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
        if (!err) {
            const commentList = coms
            let newCommentList = commentList.map((com) => {
                return {
                    _id: com._id,
                    username: username,
                    date: com.date,
                    content: com.content
                }
            })
            res.send(newCommentList)
        } else {
            console.log(err)
        }

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
    Post.findById(postId)
        .populate({ path: "comments" })
        .exec((err, post) => {
            (async () => {
                // wait for usernames to be added to each comment
                await Promise.all(post.comments.map(async (com) => {
                    let username
                    // wait to retrieve user
                    await User.findById(com.userId, (err, user) => {
                        if (!err) {
                            username = user.username
                        }
                    })
                    return {
                        _id: com._id,
                        username: username,
                        date: com.date,
                        content: com.content
                    }
                })).then(comments => res.json(comments))
            })()
        })
})

// create one comment
router.post("/create/:userId/:postId", (req, res) => {
    const body = req.body;
    const userId = req.params.userId;
    const postId = req.params.postId;
    console.log(body)
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
                                        { comments: newCommentList }, (err, post) => {
                                            if (!err) {
                                                Post.findById(postId)
                                                    .populate("comments")
                                                    .exec((err, post) => {
                                                        !err ? res.json({
                                                            _id: com._id,
                                                            username: user.username,
                                                            date: com.date,
                                                            content: com.content
                                                        }) : console.log(err)
                                                    })
                                            } else {
                                                console.log(err)
                                            }
                                        })
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
router.delete("/delete/:commentId/:userId/:postId", (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.params.userId;
    const postId = req.params.postId;
    // find comment and delete from database
    Comment.findOneAndDelete({ _id: commentId }, (err, com) => {
        if (!err) {
            // find the comment's associated user
            User.findById(userId, (err, data) => {
                if (!err) {
                    let newUserCommentList = data.comments.filter((id) => {
                        id === commentId ? false : true;
                    })
                    // update the users comments list 
                    User.findByIdAndUpdate(userId, { comments: newUserCommentList }, (err, data) => {
                        if (!err) {
                            // find associated post
                            Post.findById(postId, (err, data) => {
                                if (!err) {
                                    let newPostCommentList = data.comments.filter((id) => {
                                        id === commentId ? false : true;
                                    })
                                    // update post comment list 
                                    Post.findByIdAndUpdate(postId, { comments: newPostCommentList }, (err, data) => {
                                        if (!err) {
                                            console.log(`Comment with id: ${commentId} deleted!`)
                                            res.json({ status: "success" })
                                        } else {
                                            console.log(err)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })

        } else {

        }




    })
})

export default router;