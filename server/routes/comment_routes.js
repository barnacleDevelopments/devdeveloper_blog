/*
AUTHOR: Devin Davis
DATE: January 3st, 2021
FILE: comment_routes.js
*/

// DEPENDENCIES
import express from "express";
import got from "got"

// MODELS
import Comment from "../models/comment_model";
import Post from "../models/post_model";
import User from "../models/user_model";

// JWT MIDDLEWARE
import jwtCheck from "../middleware/jwt_token_check";

// CATEGORY ROUTES
const router = express.Router();

// retrieve all comments
router.get("/", (req, res) => {
    // query all comments
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
            res.status(200).send(newCommentList)
        } else {
            res.status(500).send({ status: "error" })
            console.log(err)
        }

    })
});

// retrieve one comment
router.get("/:id", (req, res) => {
    const comId = req.params.id; // comment id
    // query one comment
    Comment.findOne({ _id: comId }, (err, com) => {
        err ? res.status(500).json({ status: "error" }) : res.status(200).json(com);
    });
});

// retrieve post's comments
router.get("/post/:id", (req, res) => {
    let postId = req.params.id // post id
    // query all comments of post
    Post.findById(postId)
        .populate({ path: "comments" })
        .exec((err, post) => {
            if (!err) {
                if (post.comments.length > 0) {
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
                        })).then(comments => res.status(200).json(comments));
                    })();
                }
            } else {
                res.status(500).json({ status: "error" });
            }
        });
})

// create one comment
router.post("/create/:userId/:postId/", (req, res) => {
    const body = req.body; // request body
    const userId = req.params.userId; // user id
    const postId = req.params.postId; // post id 

    // create new comment 
    Comment.create(body, (err, com) => {
        if (!err) {
            // find associated user
            got.patch(`https://dev-qkxpd7xc.auth0.com/api/v2/users/${userId}`, {
                headers: {
                    method: "patch",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Accept: "application/json",
                    },
                    body: com._id,
                }
            })
                .then(() => {
                    // update user's comment list
                    let newUserCommentList = user.comments;
                    newUserCommentList.push(com._id);
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
                                                if (!err) {
                                                    res.status(201).json({
                                                        _id: com._id,
                                                        username: user.username,
                                                        date: com.date,
                                                        content: com.content
                                                    })
                                                } else {
                                                    res.status(500).json({ status: "error" });
                                                }
                                            })
                                    } else {
                                        res.status(500).json({ status: "error" });
                                    }
                                })
                        } else {
                            res.status(500).json({ status: "error" });
                        }
                    });
                }).catch(err => res.status(500).json({ status: "error" }));
        } else {
            res.status(500).json({ status: "error" });
        }
    });
});

// update one comment
router.put("/update/:id", jwtCheck, (req, res) => {
    const body = req.body;
    const id = req.params.id;
    Comment.findOneAndUpdate({ _id: id }, body, (err, com) => {
        if (!err) {
            console.log(`Comment with id: ${com._id} updated!`)
        } else {
            res.status(500).json({ status: "error" });
        }
    })
});

// delete one comment
router.delete("/delete/:commentId/:userId/:postId", jwtCheck, (req, res) => {
    const commentId = req.params.commentId; // comment id
    const userId = req.params.userId; // user id 
    const postId = req.params.postId; // post id 
    // find comment and delete from database
    Comment.findOneAndDelete({ _id: commentId }, (err, com) => {
        if (!err) {

            let newUserCommentList = data.comments.filter((id) => {
                id === commentId ? false : true;
            })

            // find associated post
            Post.findById(postId, (err, data) => {
                if (!err) {
                    // filter out comment from post
                    let newPostCommentList = data.comments.filter((id) => {
                        id === commentId ? false : true;
                    })
                    // update post comment list 
                    Post.findByIdAndUpdate(postId, { comments: newPostCommentList }, (err, data) => {
                        if (!err) {
                            console.log(`Comment with id: ${commentId} deleted!`)
                            res.status(200).json({ status: "success" })
                        } else {
                            res.status(500).json({ status: "error" });
                        }
                    })
                }
            })

        } else {
            res.status(500).json({ status: "error" });
        }
    })
})

export default router;