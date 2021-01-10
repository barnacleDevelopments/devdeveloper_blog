/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: PostView.tsx
*/

// DEPENDENCIES
import React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";

// CONTROLLERS
import Post from "../controllers/post_controller";
import Comment from "../controllers/comment_controler";

//COMPONENTS
import PostBody from "./PostBody";
import CommentBody from "./CommentBody";
import Title from "./Title";
import CommentForm from "./CommentForm";

// INTERFACES 
import { UserComponentData } from "../interfaces/user_interfaces";
import { NewCommentData } from "../interfaces/comment_interfaces";
import { NewPostData } from "../interfaces/post_interfaces";

interface ParamTypes {
    id: string
}

// INTERFACES 
interface PostView {
    user: UserComponentData;
}


// STYLES
const Body = styled("section")`
    div {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    h2 {
        color: #f5f5f5;
        text-align: center;
        font-size: 2em;
    }
    div a {
        background-color: #314455;
        border-radius: 4px;
        padding: 10px 15px;
        box-shadow: 
        display: inline-block;
        grid-column: 2;
        text-align: center;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: #f5f5f5;
        box-shadow: 3px 3px 30px -10px black;
        margin-top: 9px;
    }
`;

const PostView: React.FunctionComponent<PostView> = ({ user }) => {
    const [post, setPost] = useState<NewPostData>({
        title: "",
        content: ""
    });

    // Retrieve post id from url
    const { id } = useParams<ParamTypes>();

    // retrieve post
    useEffect(() => {
        Post.prototype.getOne(id)
            .then((post) => {
                setPost(post);
            }).catch((err) => {
                console.log(err)
            })
    }, []);


    const [comments, setComments] = useState<NewCommentData[]>([])

    // create new comment on post
    const createComment = (comment: NewCommentData) => {
        Comment.prototype.create(user._id, id, comment)
            .then(data => {
                console.log(data)
                setComments(data)
            })
    }

    // retrieve post comments
    useEffect(() => {
        Comment.prototype.getFromPost(id)
            .then(data => setComments(data))
    }, [])


    return (
        <Body>
            <PostBody user={user} id={id} title={post.title} content={post.content} subTitle={""} />
            <Title title="COMMENTS" />
            {user.status ? <CommentForm createComment={createComment} /> : null}
            {comments.length <= 0 ?
                <div>
                    <h2>No comments... <br />be the first!</h2>
                    <Link to="/login">Login</Link>
                </div>

                : comments.map((comment) => {
                    return <CommentBody username="f" key={comment._id} user={user} id={comment._id} content={comment.content} date={comment.date} />
                })}
        </Body>
    )
}

export default PostView;