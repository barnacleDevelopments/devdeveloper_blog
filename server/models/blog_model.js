/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: blog_model.js
*/

import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    cat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
});


const Blog = mongoose.model("Blog", blogSchema);

export default Blog;