/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: blog_model.js
*/

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: String,
    desc: String,
    count: Number,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
});


const Category = mongoose.model("Category", categorySchema);

export default Category;