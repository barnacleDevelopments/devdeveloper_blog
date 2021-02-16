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

export const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }


    res.sendStatus(401);
}

// login user
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

// sign up user
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

// logout user
router.post("/logout", (req, res) => {
    req.logout();
    res.json({ status: "success", message: "User successfully logged out." })
})

// get user
router.get("/user", isLoggedIn, (req, res) => {
    if (req.user) {
        res.json(req.user)
    } else {
        res.redirect("/categories")
    }
})

// check if user is authenticated
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

// change user password
router.put("/changePassword", isLoggedIn, (req, res, next) => {
    let user = req.user;
    let oldPassword = req.body.oldPass
    let newPassword = req.body.newPass;

    console.log(oldPassword)
    console.log(newPassword)

    User.authenticate()(user.username, oldPassword)
        .then((user) => {
            User.findById(user._id, (err, user) => {
                if (!err) {
                    user.setPassword(newPassword, () => {
                        user.save()
                        res.json({ status: "success" })
                    })


                } else {
                    res.json({ status: "error", message: err })
                }

            })

        })
        .catch(err => {
            console.log(err)
            res.json({ status: "error", message: err })
        })
});

// delete user account
router.delete("/deleteAccount", isLoggedIn, (req, res, next) => {
    let user = req.user;

    User.deleteOne({ _id: user._id }, (err, data) => {
        if (!err) {
            res.json({
                status: "success",
                message: "User successfuly deleted from database."
            });
        } else {
            res.json({
                status: "error",
                message: "An error occured while trying to delete account. Please try again."
            })
        }
    })
})

export default router