/**
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: Comment.tsx
*/

// DEPENDENCIES
import React, { useState } from "react";
import styled from "@emotion/styled";

// CONTROLLERS
import Comment from "../controllers/comment_controler";

// INTERFACES 
import { UserComponentData } from "../interfaces/user_interfaces";

interface CommentComponent {
    id: string,
    content: string,
    date: string,
    username: string,
    user: UserComponentData
}

// STYLES
const Body = styled("article")`
    width: 100%;
    background-color: #314455;
    position: relative;
    border-radius: 4px;
    color: #f5f5f5;
    margin-top: 28px;
    display: grid;
    grid-template-columns: 4fr 1fr;
    h1 {
        position: absolute;
        top: -17px;
        left: 15px;
        background-color: #9e5a63;
        padding: 8px 10px 8px 10px;
        border-radius: 4px;
        font-weight: bold;
        text-transform: lowercase;
        text-transform: capitalize;
    }
    p {
        margin-bottom: 10px;
        font-size: 16px;
        text-align: left;
        font-weight: 100;
        line-height: 1.5;
    }
    p:nth-of-type(2) {
        font-size: .8em;
        opacity: .7;
    }
    div:nth-of-type(2) {
        grid-column: 2;
        padding-right: 10px;
        padding-bottom: 10px;
        height: 43px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        align-items: flex-end;

        a:nth-of-type(1) {
            margin-top: 11px;
            width: 30px;
            background-color: #97aabd;
            padding: 6px;
            text-align: center;
            border-radius: 30px;
            position: relative;
            top: -20px;
            right: -20px;

            i {
                color: #f5f5f5;
            }
        }
        a:nth-of-type(2) {
            background-color: #9e5a63;
            padding: 9px 14px 9px 14px;
            border-radius: 4px;
            display: block;
        }
    }
`;

const Content = styled("div")`
    padding: 25px 15px 15px 15px;
    grid-column: 1;
`;

// COMPONENT
const CommentBody: React.FunctionComponent<CommentComponent> = ({ user, id, content, date, username }) => {
    const [isDeleted, setIsDeleted] = useState(false)

    // delete comment
    const deleteComment = () => {
        setIsDeleted(true)
        Comment.prototype.delete(id)

    }

    // display comment if not deleted
    if (isDeleted) {
        return null;
    } else {
        return (
            <Body>
                <h1>{username}</h1>
                <Content>
                    <p>{content}</p>
                    <p>{date}</p>
                </Content>
                <div>
                    {user.role === "administrator" && user.status ?
                        <a onClick={deleteComment}><i className="far fa-trash-alt fa-1x"></i></a> : null}
                </div>
            </Body>
        )

    }

}

export default CommentBody;