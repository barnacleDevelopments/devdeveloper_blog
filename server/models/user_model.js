/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: user_model.js
*/

import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, default: "user" },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
});

userSchema.plugin(passportLocalMongoose, {
    maxAttempts: 5,
    usernameUnique: true,
    usernameField: "username"
});

const User = mongoose.model("User", userSchema);

export default User;