/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: PostView.tsx
*/

// DEPENDENCIES
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Link from "next/link"

// CONTROLLERS
import Comment from "../../../controllers/comment_controler";
import Post from "../../../controllers/post_controller";

//COMPONENTS
import PostBody from "../../../components/PostBody";
import CommentBody from "../../../components/CommentBody";
import Title from "../../../components/Title";
import CommentForm from "../../../components/CommentForm";
import ErrorContext from "../../../contexts/ErrorContext";

// HOOKS
import useAuth from "../../../hooks/useAuth";
import { useRouter } from "next/router";


// INTERFACES 
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
    const Router = useRouter();
    const { postId, catId } = Router.query
    const [post, setPost] = useState<PostData>();
    const [comments, setComments] = useState<CommentComponentData[]>([])
    const { user, isLoading, isAdmin } = useAuth();
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
    const createComment = async (comment: NewCommentData) => {
        Comment.prototype.create(postId, comment)
            .then(data => {
                let newCommentList: CommentComponentData[] = comments
                setComments([data, ...newCommentList]);
            })
    }

    // retrieve post comments
    useEffect(() => {
        Comment.prototype.getFromPost(postId)
            .then(data => {
                setComments(data)
            })
    }, [])

    return (
        <Body>
            {post &&
                <PostBody
                    title={post.title}
                    content={post.content} />
            }
            <Title title="COMMENTS" />
            {(user && !isLoading) && <CommentForm
                createComment={createComment}
                username={user.name}
            />
            }
            {(!user && !isLoading) && <Link href="/login">Login</Link>}
            {comments.length <= 0 ?
                <Fallback>
                    <h2>No comments... <br />be the first!</h2>
                </Fallback>

                : comments.map((comment) => {
                    return <CommentBody
                        username={comment.username}
                        key={comment._id}
                        commentId={comment._id}
                        content={comment.content}
                        date={comment.date} />
                })}

        </Body>
    )
}

export default PostView;