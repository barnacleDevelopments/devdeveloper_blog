/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: PostView.tsx
*/

// DEPENDENCIES
import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

// CONTROLLERS
// import Comment from "../../../controllers/comment_controller";
import Post from "../../../controllers/post_controller";

//COMPONENTS
import PostBody from "../../../components/PostBody";
import CommentBody from "../../../components/CommentBody";
import Title from "../../../components/Title";
import CommentForm from "../../../components/CommentForm";

// HOOKS
import useAuth from "../../../hooks/useAuth";
// import { useRouter } from "next/router";
import useComments from "../../../hooks/useComments";

// INTERFACES 
interface PostView {
    comments: any
    post: any
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

const PostView: React.FunctionComponent<PostView> = ({ post }) => {
    // get autheticated user
    const { user, isLoading } = useAuth();
    const { createComment, deleteComment, comments } = useComments(post._id);
    console.log(comments)
    return (
        <Body>
            {post &&
                <PostBody
                    title={post.title}
                    content={post.content} />}

            <Title title="COMMENTS" />

            {(user && !isLoading) && <CommentForm
                createComment={createComment}
                username={user.name}
            />}

            {(!user && !isLoading) && <Link href="/login">Login</Link>}

            {comments?.length ?? 0 > 0 ?
                comments.map((comment) => {
                    return <CommentBody
                        username={comment.username}
                        key={comment._id}
                        commentId={comment._id}
                        content={comment.content}
                        date={comment.date}
                        deleteComment={deleteComment} />
                })
                :
                <Fallback>
                    <h2>No comments... <br />be the first!</h2>
                </Fallback>}
        </Body>
    )
}

export async function getServerSideProps(context: any) {
    // get post ID parameter
    const postId = context.params.postId
    const post = await Post.getOne(postId)
        .then((data: PostData) => data)

    return {
        props: {
            post
        }, // will be passed to the page component as props
    }
}

export default PostView;