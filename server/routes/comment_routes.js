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
    Comment.findOne({_id: comId}, (err, com) => {
        err ? console.log(err) : res.json(com);
    });
});

// create one comment
router.post("/create", (req, res) => {
    const body = req.body;
    Comment.create(body, (err, com) => {
        err ? console.log(err) : (
            console.log(`Comment created! It's id is: ${com._id}`)
        )
    })
});

// update one comment
router.put("/update/:id", (req, res) => {
    const body = req.body;
    const id = req.params.id;
    Comment.findOneAndUpdate({_id: id}, body, (err, com) => {
        err ? console.log(err) : ( 
            console.log(`Comment with id: ${com._id} updated!`)
        )
    })

});

// delete one comment
router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    Comment.findOneAndDelete({_id: id}, (err, com) => {
        if(!err) {
            Comment.findOne({_id: id}, (err, com) => {
                if(!err) {
                    Post.deleteMany({catId: id}, (err, post) => {
                        err ? console.log(err) : console.log()
                    })
                }
            })
        }
        err ? console.log(err) : (
            console.log(`Comment with id: ${com._id} deleted!`)
        )
    })
})

export default router;