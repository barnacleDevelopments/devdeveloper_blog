import User from "../models/user_model";
import Category from "../models/category_model";
import Post from "../models/post_model";
import Comment from "../models/comment_model";

Category.create({

    name: "Category One",
    desc: "This is the first category.",
    count: 0,
    posts: ["1"]
});

Post.create({

    title: "Post One",
    content: "This is some content.",
    date: 'September 28th, 2021',
    user: "1",
    comments: ["1"]
});

Comment.create({

    content: "This post is awesome!",
    date: 'September 28th, 2021',
    userId: "1",
    postId: "1"
})


