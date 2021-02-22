/*
AUTHOR: Devin Davis
DATE: January 3st, 2021
FILE: category_routes.js
*/
// DEPENDENCIES
import express from "express";
import cors from "cors";
import * as yup from "yup"

// MODELS
import Category from "../models/category_model";
import Post from "../models/post_model";
import { isLoggedIn } from "./user_routes";

// CORS CONFIGURATION
import { adminCorsOptions, guestCorsOptions } from "../configuration/cors/cors_config"

// CATEGORY ROUTES
const router = express.Router();

// retrieve all categories
router.get("/", (req, res) => {
    Category.find({}, (err, cats) => {
        err ? res.json({ status: "error", message: err }) : res.json({ data: cats, status: "success" })
    })
});

// retrieve one category 
router.get("/:id", (req, res) => {
    const catId = req.params.id;
    Category.findOne({ _id: catId }, (err, cat) => {
        err ? res.json({ status: "error", message: err }) : res.json({ data: cat, status: "success" });
    });
});

// retrieve posts of category
router.get("/posts/:id", (req, res) => {
    const catId = req.params.id;
    Category.findById(catId)
        .populate("posts")
        .exec((err, cat) => {
            if (!err) {
                res.json({ data: cat.posts, status: "success" });
                console.log(`Posts retrieved from category with id: ${cat._id}`)
            } else {
                res.json({
                    status: "error",
                    message: err
                })
            }
        });
})

// create one category
router.post("/create", isLoggedIn, (req, res) => {
    if (req.user.role === "administrator") {
        const body = req.body;

        const categorySchema = yup.object().shape({
            name: yup.string().required().min(4).max(20),
            desc: yup.string().required().min(16).max(50)
        })

        categorySchema.validate(body)
            .then(() => {
                Category.create(body, (err, cat) => {
                    if (!err) {
                        res.json({ data: cat, status: "success" });
                        console.log(`Category created! It's id is: ${cat._id}`)
                    } else {
                        res.json({
                            status: "error",
                            message: err
                        })
                    }

                })
            }).catch(err => res.json({ status: "error", message: err }))
    } else {
        res.redirect("/")
    }



})

// update one category
router.put("/update/:id", isLoggedIn, (req, res) => {
    if (req.user.role === "administrator") {
        const body = req.body;
        const id = req.params.id;

        const categorySchema = yup.object().shape({
            name: yup.string().required().min(4).max(20),
            desc: yup.string().required().min(16).max(40)
        })

        categorySchema.validate(body)
            .then(() => {
                Category.findByIdAndUpdate(id, body, {
                    new: true
                }, (err, cat) => {
                    if (!err) {
                        res.json({ data: cat, status: "success" })
                        console.log(`Category with id: ${cat._id} updated!`)
                    } else {
                        res.json({ status: "error" })
                    }
                })
            }).catch(err => res.json({ status: "error", message: err.message }))
    } else {
        res.redirect("/")
    }

});

// delete one category
router.delete("/delete/:id", isLoggedIn, (req, res) => {
    if (req.user.role === "administrator") {
        const id = req.params.id;
        Category.findOneAndDelete({ _id: id }, (err, cat) => {
            if (!err) {
                Category.findOne({ _id: id }, (err, cat) => {
                    if (!err) {
                        Post.deleteMany({ catId: id }, (err, cat) => {
                            err ? console.log(err) : res.json({ status: "success" })
                            console.log(`Category with id: ${cat._id} deleted!`)
                        })
                    }
                })
            }
        })
    } else {
        res.redirect("/")
    }
})

export default router;