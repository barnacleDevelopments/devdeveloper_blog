/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: PostView.tsx
*/

// DEPENDENCIES
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";

// CONTROLLERS
import Comment from "../controllers/comment_controler";
import Post from "../controllers/post_controller";

//COMPONENTS
import PostBody from "./PostBody";
import CommentBody from "./CommentBody";
import Title from "./Title";
import CommentForm from "./CommentForm";
import { UserContext } from "../contexts/UserContext";
import ErrorContext from "../contexts/ErrorContext";


// INTERFACES 
interface ParamTypes {
    postId: string,
    catId: string
}

interface PostView {

}

// STYLES
const Body = styled("section")`
    h2 {
        color: #f5f5f5;
        font-size: 2em;
    }
`;

const Fallback = styled("div")`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    a {
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

const PostView: React.FunctionComponent<PostView> = () => {
    // Retrieve post id from url
    const { postId, catId } = useParams<ParamTypes>();
    const [post, setPost] = useState<PostData>();
    const [comments, setComments] = useState<CommentComponentData[]>([])
    const { isAuthenticated, user } = useContext(UserContext);
    const { addError } = useContext(ErrorContext);

    useEffect(() => {
        Post.prototype.getOne(postId)
            .then((data: PostResponse) => {
                if (data.status === "error") {
                    addError(data.message)
                } else {
                    setPost(data.data)
                }

            })
    }, [])

    // create new comment on post
    const createComment = (comment: NewCommentData) => {
        console.log(user)
        Comment.prototype.create(user._id, postId, comment)
            .then(data => {
                let newCommentList: CommentComponentData[] = comments
                setComments([data, ...newCommentList])
            })
    }

    // retrieve post comments
    useEffect(() => {
        Comment.prototype.getFromPost(postId)
            .then(data => setComments(data))

    }, [])

    return (
        <Body>
            {post ?
                <PostBody
                    user={user}
                    postId={postId}
                    catId={catId}
                    title={post.title}
                    content={post.content} />
                : null
            }
            <Title title="COMMENTS" />
            {isAuthenticated ? <CommentForm
                createComment={createComment}
                userId={user._id}
                postId={postId} /> : null
            }
            {isAuthenticated ? null : <Link to="/login">Login</Link>}
            {comments.length <= 0 ?
                <Fallback>
                    <h2>No comments... <br />be the first!</h2>
                </Fallback>

                : comments.map((comment) => {
                    return <CommentBody
                        username={comment.username}
                        key={comment._id}
                        commentId={comment._id}
                        postId={postId}
                        content={comment.content}
                        date={comment.date} />
                })}

        </Body>
    )
}

export default PostView;