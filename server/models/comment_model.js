/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: comment_model.js
*/

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    content: String,
    date: String,
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply"
    }]
});


const Comment = mongoose.model("Comment", commentSchema);

export default Comment;