/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: PostSnip.tsx
*/

// DEPENDENCIES
import * as React from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

// ASSETS
import CardPhoto from "../../img/logo.png";

// COMPONENTS
import ConfirmForm from "./ConfirmForm";

// INTERFACES
interface PostData {
    postId: string,
    title: string,
    content: string,
    user: UserComponentData,
    catId: string,
    deletePost(postId: string, catId: string): void
}

const PostSnipBody = styled("div")`
    background-color: #314455;
    color: #f5f5f5;
    display: grid;
    grid-template-columns: 100px 1fr;
    margin-bottom: 14px;
    box-shadow: 3px 3px 30px -20px black;
    border-radius: 4px;
    padding: 10px;
    position: relative;
    > a:nth-of-type(1) {
        position: absolute;
        right: -10px;
        top: -10px;
        background-color: #97aabd; 
        padding: 6px;
        border-radius: 30px;
        color: #f5f5f5;
    }
    
    > a:nth-of-type(2) {
        position: absolute;
        right: -10px;
        top: 30px;
        background-color: #97aabd; 
        padding: 6px;
        border-radius: 30px;
        color: #f5f5f5;
    }
    img {
        width: 100%;
    }

`

const PostSnipContent = styled("div")`
    display: grid;
    aligh-items: end;
    grid-template-columns: 3fr 1fr;
    padding: 10px 10px 5px 10px;
    column-gap: 15px;
    h2 {
        font-size: 1.8em;
        grid-column: 1 / span 2;
        font-weight: bold;
        margin-bottom: 10px;
    }
    p {
        grid-column: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    a {
        background-color: #9E5A63;
        border-radius: 4px;
        padding: 10px 15px;
        box-shadow: 3px 3px 30px -10px black;
        display: inline-block;
        grid-column: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 30px;
        text-decoration: none;
        color: #f5f5f5;
        margin-top: 9px;
    }
    div {
        display: flex;
        align-items: end;
        justify-content: flex-end;
    }
`;

const PostSnip: React.FunctionComponent<PostData> = ({ user, catId, postId, title, content, deletePost }) => {
    const [formVisible, setFormVisible] = useState<boolean>(false)

    const toggleDeleteForm = () => {
        formVisible ?
            setFormVisible(false) : setFormVisible(true)
    }

    return (
        <PostSnipBody>
            <img src={CardPhoto} />
            <PostSnipContent>
                <h2>{title ? title : "No Title"}</h2>
                <p>{content ? content : "This post has no content."}</p>
                <div>
                    <Link to={`/posts/${catId}/${postId}`}>READ</Link>
                </div>
            </PostSnipContent>
            {/* ADMIN COMPONENTS */}
            {formVisible ? <ConfirmForm cancleHandler={toggleDeleteForm} confirmHandler={() => {
                toggleDeleteForm()
                deletePost(postId, catId)
            }} btnText="Confirm" message="You sure you want to delete this thing?" /> : null}
            {user.role === "administrator" ? <Link to={`/posts/edit/${catId}/${postId}`}><i className="fas fa-pen fa-1x"></i></Link> : null}
            {user.role === "administrator" ? <a onClick={toggleDeleteForm}><i className="far fa-trash-alt"></i></a> : null}
        </PostSnipBody>
    )
}

export default PostSnip;