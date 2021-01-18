/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: post_routes.js
*/

import express from "express";
import passport from 'passport';

// MODELS
import User from "../models/user_model";

const router = express.Router();

export function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.sendStatus(401);
}

router.post('/login', passport.authenticate("local"), (req, res) => {
    res.json({ status: "success" })
});

router.post('/signup', (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
        if (!err) {
            passport.authenticate("local")(req, res, () => {
                res.json({ status: "success" })
            })
        } else {
            res.json({ status: "failure" })
            console.log(err)
        }
    })
});

router.post("/logout", (req, res) => {
    req.logout();
    res.json({ status: "success", message: "User successfully logged out." })
})

router.get("/user", isLoggedIn, (req, res) => {
    if (req.user) {
        res.json(req.user)
    } else {
        res.redirect("/categories")
    }
})

router.get("/isloggedin", isLoggedIn, (req, res) => {
    if (req.user) {
        let user = {
            _id: req.user._id,
            username: req.user.username,
            status: true,
            role: req.user.role
        }
        res.json(user)
    } else {
        res.json({ status: "failure", message: "User successfully logged out." })
    }
})

export default router