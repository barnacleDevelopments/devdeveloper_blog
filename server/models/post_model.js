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
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    image: {
        data: Buffer,
        contentType: String
    },
    catId: String
});

const Post = mongoose.model("Post", postSchema);

export default Post;