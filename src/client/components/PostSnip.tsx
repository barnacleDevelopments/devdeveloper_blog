/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: PostSnip.tsx
*/

// DEPENDENCIES
import React, { useState, useContext } from "react";

import { stripHtml } from "string-strip-html";

import styled from "@emotion/styled";
import { Link } from "react-router-dom";

// ASSETS
import CardPhoto from "../img/logo.png";

// COMPONENTS
import ConfirmForm from "./ConfirmForm";
import PostContext from "../contexts/PostContext";
import PostForm from "./PostForm";
import useAuth from "../hooks/useAuth";


// STATELESS COMPONENTS
import { EditBtn, DeleteBtn, CardBtn } from "../stateless_components/buttons";

// INTERFACES
interface PostData {
    postId: string,
    title: string,
    content: string,
    catId: string
}

const Body = styled("div")`
    background-color: #314455;
    color: #f5f5f5;
    display: grid;
    grid-template-columns: 100px 1fr;
    margin-bottom: 14px;
    box-shadow: 1px 1px 5px 0px #00000040;
    border-radius: 4px;
    padding: 10px;
    position: relative;
    min-width: 270px;
 
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    p {
        grid-column: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    div {
        display: flex;
        align-items: end;
        justify-content: flex-end;
    }
`;

const PostSnip: React.FunctionComponent<PostData> = ({ catId, postId, title, content }) => {
    // edit form visibility state 
    const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
    // delete form visibility state 
    const [deleteFormVisible, setDeleteFormVisible] = useState<boolean>(false);
    // post context reference
    const { deletePost, updatePost } = useContext(PostContext);
    // auth context 
    const { isAdmin } = useAuth();

    // toggle delete form visibility
    const toggleDeleteForm = () => {
        deleteFormVisible ?
            setDeleteFormVisible(false) : setDeleteFormVisible(true)
    }
    // toggle edit form visibility
    const toggleEditForm = () => {
        editFormVisible ?
            setEditFormVisible(false) : setEditFormVisible(true)
    }

    return (
        <Body>
            <img src={CardPhoto} />
            <PostSnipContent>
                <h2>{title ? title : "No Title"}</h2>
                <p>{content ? stripHtml(content).result : "This post has no content."}</p>
                <div>
                    <CardBtn><Link to={`/posts/${catId}/${postId}`}>Read</Link></CardBtn>
                </div>
            </PostSnipContent>

            {/* POST EDIT FORM */}
            {editFormVisible &&
                <PostForm
                    title={title}
                    content={content}
                    btnText="Update"
                    cancleFunc={toggleEditForm}
                    submitFunc={(postData: PostFormData) =>
                        updatePost(postId, postData.title, postData.content)} />}


            {/* ADMIN COMPONENTS */}
            {deleteFormVisible &&
                <ConfirmForm
                    cancelHandler={toggleDeleteForm}
                    confirmHandler={() => {
                        toggleDeleteForm();
                        deletePost(postId, catId);
                    }} btnText="Confirm" message="You sure you want to delete this thing?" />}

            {/* EDIT FORM BUTTON */}
            {isAdmin && <EditBtn onClick={
                () => toggleEditForm()
            }><i className="fas fa-pen fa-1x"></i></EditBtn>}

            {/* DELETE FORM BUTTON */}
            {isAdmin && <DeleteBtn onClick={
                () => toggleDeleteForm()
            }><i className="far fa-trash-alt"></i></DeleteBtn>}
        </Body>
    )
}

export default PostSnip;