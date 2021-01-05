/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: post_model.js
*/

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: String,
    desc: String,
    count: Number,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});


const Category = mongoose.model("Category", categorySchema);

export default Category;