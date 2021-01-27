/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: post_routes.js
*/

import express from "express";
import passport from 'passport';
import * as yup from "yup";

// MODELS
import User from "../models/user_model";

const router = express.Router();

export function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.sendStatus(401);
}

router.post('/login', passport.authenticate("local"), (req, res) => {
    let user = {}
    user.username = req.body.username;
    user.password = req.body.password;
    console.log(user)
    let userSchema = yup.object().shape({
        username: yup.string().required().min(6).max(20),
        password: yup.string().required().min(8).max(20)
    })

    userSchema.validate(user)
        .then(() => {
            res.json({ status: "success" });
        })
        .catch((err) => {
            console.log("Validaton error")
            res.json({ status: "failure", message: err.message })
        })

});

router.post('/signup', (req, res) => {
    let newUser = {}
    newUser.username = req.body.username;
    newUser.password = req.body.password;

    let userSchema = yup.object().shape({
        username: yup.string().required().min(6).max(20),
        password: yup.string().required().min(8).max(20)
    })

    userSchema.validate(newUser)
        .then(() => {
            User.register(new User({ username: newUser.username, role: "administrator" }), newUser.password, (err, user) => {
                if (!err) {
                    passport.authenticate("local")(req, res, () => {
                        res.json({ status: "success" })
                    })
                } else {
                    res.json({ status: "failure", message: err.message })
                }
            })
        })
        .catch((err) => {
            console.log("Validaton error")
            res.json({ status: "failure", message: err.message })
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