/*
AUTHOR: Devin Davis
DATE: January 3st, 2021
FILE: category_routes.js
*/

import express from "express";
import bodyParser from "body-parser";
const router = express.Router();

// MODELS
import Category from "../models/category_model";
import Post from "../models/post_model";

// CATEGORY ROUTES

// retrieve all categories
router.get("/", (req, res) => {
    Category.find({}, (err, cats) => {
        err ? console.log(err) : res.json(cats)
    })
});

// retrieve one category 
router.get("/:id", (req, res) => {
    const catId = req.params.id;
    Category.findOne({ _id: catId }, (err, cat) => {
        err ? console.log(err) : res.json(cat);
    });
});

// retrieve blogs of category
router.get("/posts/:id", (req, res) => {
    const catId = req.params.id;
    Category.findById(catId)
        .populate("posts")
        .exec((err, cat) => {
            err ? console.log(err) : res.json(cat)
        })
});

// create one category
router.post("/create", (req, res) => {
    const body = req.body;
    Category.create(body, (err, cat) => {
        if (!err) {
            res.json(cat);
            console.log(`Category created! It's id is: ${cat._id}`)
        } else {
            console.log(err)
        }

    })
});

// update one category
router.put("/update/:id", (req, res) => {
    const body = req.body;
    const id = req.params.id;
    Category.findOneAndUpdate({ _id: id }, body, (err, cat) => {
        if (!err) {
            res.json(cat)
            console.log(`Category with id: ${cat._id} updated!`)
        } else {
            console.log(err)
        }
    })

});

// delete one post
router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    Category.findOneAndDelete({ _id: id }, (err, cat) => {
        if (!err) {
            Category.findOne({ _id: id }, (err, cat) => {
                if (!err) {
                    Post.deleteMany({ catId: id }, (err, cat) => {
                        err ? console.log(err) : console.log()
                    })
                }
            })
        }
        err ? console.log(err) : console.log(`Category with id: ${cat._id} deleted!`)
    })
})

export default router;