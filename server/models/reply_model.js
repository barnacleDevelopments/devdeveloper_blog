/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: comment_model.js
*/

import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    date: String,
});

const Reply = mongoose.model("Reply", replySchema);

export default Reply;