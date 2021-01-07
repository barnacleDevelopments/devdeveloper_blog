/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: post_routes.js
*/

import express from "express";
import User from "../models/user_model";
import passport from 'passport';

const router = express.Router();

export function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.sendStatus(401);
}

router.post('/login', passport.authenticate('local-login', { failureRedirect: '/login' }), (req, res) => {
    console.log(req.user)

});


router.get("/user", isLoggedIn, (req, res) => {
    if (req.user) {
        res.json(req.user)
    } else {
        res.redirect("/categories")
    }
})

router.get("/isloggedin", isLoggedIn, (req, res) => {
    if (req.user) {
        let user = { status: true, role: req.user.role }
        res.json(user)
    } else {
        res.redirect("/categories")
    }
})

router.post("/signup", passport.authenticate("local-signup", { failWithRedirect: "/signup" }), (req, res) => {
    // User.create({ username: req.user.username, password: req.user.password }, (err, user) => {

    // });
    console.log(req.user)
})

export default router