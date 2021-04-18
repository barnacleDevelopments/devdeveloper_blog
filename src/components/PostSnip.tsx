/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: PostSnip.tsx
*/

// DEPENDENCIES
import React, { useState, useContext } from "react";

import { stripHtml } from "string-strip-html";

import styled from "@emotion/styled";

// FONT AWESOME 
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

// COMPONENTS
import ConfirmForm from "./ConfirmForm";
import PostContext from "../contexts/PostContext";
import PostForm from "./PostForm";
import useAuth from "../hooks/useAuth";


// STATELESS COMPONENTS
import { EditBtn, DeleteBtn, CardBtn } from "../styled_components/buttons";
import { useRouter } from "next/router";

// INTERFACES
interface PostData {
    postId: string,
    title: string,
    content: string
}

const Body = styled("div")`
    background-color: #314455;
    color: #f5f5f5;
    display: grid;
    grid-template-columns: 100px 1fr;
    margin-bottom: 25px;
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

const PostSnip: React.FunctionComponent<PostData> = ({ postId, title, content }) => {
    // edit form visibility state 
    const [editFormVisible, setEditFormVisible] = useState<boolean>(false);
    // delete form visibility state 
    const [deleteFormVisible, setDeleteFormVisible] = useState<boolean>(false);
    // post context reference
    const { deletePost, updatePost } = useContext(PostContext);
    // auth context 
    const { isAdmin, user } = useAuth();
    // query parameters 
    const router = useRouter();
    const { catId } = router.query

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
            <img src="../img/logo.png" />
            <PostSnipContent>
                <h2>{title ? title : "No Title"}</h2>
                <p>{content ? stripHtml(content).result : "This post has no content."}</p>
                <div>
                    <CardBtn
                        onClick={() =>
                            router.push(`/posts/one/${postId}`)}>Read</CardBtn>
                </div>
            </PostSnipContent>

            {/* POST EDIT FORM */}
            {editFormVisible &&
                <PostForm
                    title={title}
                    content={content}
                    btnText="Update"
                    includesCategoryPicker={false}
                    cancelFunc={toggleEditForm}
                    submitFunc={(postData: PostFormData) => {
                        updatePost(postId, postData.title, postData.content)
                    }} />}

            {/* ADMIN COMPONENTS */}
            {deleteFormVisible &&
                <ConfirmForm
                    cancelHandler={toggleDeleteForm}
                    btnText="Confirm"
                    message="You sure you want to delete this thing?"
                    confirmHandler={() => {
                        toggleDeleteForm();
                        if (catId !== undefined) {
                            deletePost(postId, catId);
                        }
                    }}
                />}

            {/* EDIT FORM BUTTON */}
            {(user && isAdmin) && <EditBtn onClick={
                () => toggleEditForm()
            }><Icon icon={faPen}></Icon></EditBtn>}

            {/* DELETE FORM BUTTON */}
            {(user && isAdmin) && <DeleteBtn onClick={
                () => toggleDeleteForm()
            }><Icon icon={faTrash}></Icon></DeleteBtn>}
        </Body >
    )
}

export default PostSnip;