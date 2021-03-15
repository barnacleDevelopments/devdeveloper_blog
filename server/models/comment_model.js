/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: comment_model.js
*/

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: String,
    date: String,
    username: String,
    userId: String,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
});


const Comment = mongoose.model("Comment", commentSchema);

export default Comment;