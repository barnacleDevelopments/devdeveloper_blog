/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: source_model.js
*/

import mongoose from "mongoose";

const sourceSchema = new mongoose.Schema({
    title: String, 
    url: String,
    pubDate: String,
    accDate: String,
    authorLastName: String,
    authorInitials: String
});

const Source = mongoose.model("Source", sourceSchema);

export default Source;