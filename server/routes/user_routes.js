/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: post_routes.js
*/

import express from "express";
import passport from 'passport';
import { useReducer } from "react";
import * as yup from "yup";

// MODELS
import User from "../models/user_model";

const router = express.Router();

export const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }


    res.sendStatus(401);
}

// login user route
router.post('/login', (req, res, next) => {
    console.log("ddd")
    if (!req.body.username || !req.body.password) {
        res.json({ status: "error" })
    }

    let incomingUser = {}
    incomingUser.username = req.body.username;
    incomingUser.password = req.body.password;

    let userSchema = yup.object().shape({
        username: yup.string().required().min(6).max(20),
        password: yup.string().required().min(8).max(20)
    })

    userSchema.validate(incomingUser)
        .then(() => {
            passport.authenticate("local", (error, user) => {
                req.login(user, (err) => {
                    if (err) {
                        res.json({ status: "error", message: error })

                    } else {
                        res.json({
                            status: "success", data: {
                                id_: user._id,
                                username: user.username,
                                role: user.role
                            }
                        })
                    }
                })
            })(req, res, next)
        })
        .catch((err) => {
            res.json({ status: "error", message: err.message })
        })
});

// signup user route
router.post('/signup', (req, res, next) => {
    let newUser = {}
    newUser.username = req.body.username;
    newUser.password = req.body.password;

    let userSchema = yup.object().shape({
        username: yup.string().required().min(6).max(20),
        password: yup.string().required().min(8).max(20)
    })

    userSchema.validate(newUser)
        .then(() => {
            User.register(new User({ username: newUser.username }), newUser.password, (err, user) => {
                if (!err) {
                    const authenticate = User.authenticate();
                    authenticate(user.username, user.password, (error, result) => {
                        if (err) {
                            console.log(err)
                            res.json({ status: "error", message: error })
                        } else {
                            res.json({
                                status: "success"
                            })
                        }
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