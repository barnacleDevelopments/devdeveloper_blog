/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: blog_model.js
*/

import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    image: {
        data: Buffer,
        contentType: String
    }
});

const Post = mongoose.model("Post", postSchema);

export default Post;