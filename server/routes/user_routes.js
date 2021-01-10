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

router.post('/login', passport.authenticate('local-login', { failureRedirect: '/' }), (req, res) => {
    res.redirect("/")

});

router.post('/signup', passport.authenticate('local-signup', { failureRedirect: '/' }), (req, res) => {
    res.redirect("/")

});

router.post("/signout", (req, res) => {
    req.logout();
    res.redirect("/")
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
        let user = { _id: req.user._id, status: true, role: req.user.role }
        res.json(user)
    } else {
        res.redirect("/categories")
    }
})



export default router