/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: Comment.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";

// CLASSES 
import EasyDate from "../classes/EasyDate";

// INTERFACES
interface CommentFormComponent {
    createComment(comment: CommentFormData): void,
    userId: string,
    postId: string
}

const Body = styled("article")`
    width: 100%;
    background-color: #314455;
    position: relative;
    border-radius: 4px;
    color: #f5f5f5;
    display: grid;
    grid-template-rows: 3fr 1fr;
    margin-bottom: 14px;
    padding:  14px;
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
       display: flex;
       align-items: flex-end;
       justify-content: flex-end;
    }
    a {
        display: block;
        background-color: #97aabd;
        padding: 9px 14px 9px 14px;
        height: 34px;
        text-align: center;
        border-radius: 4px;
    }
`;

const TextArea = styled("textarea")`
    background-color: #405060;
    border: none;
    border-radius: 4px;
    width: 100%;
    padding: 9px;
    padding-left: 12px;
    color: #f5f5f5;
    font-family: 'Chivo', sans-serif;
    box-sizing: border-box;
    height: 100%;
`;

const Content = styled("div")`
    margin-top: 14px;
`;

const CommentForm: React.FunctionComponent<CommentFormComponent> = ({ createComment, userId, postId }) => {
    const [commentData, setCommentData] = React.useState<CommentFormData>({ content: "", date: "" })

    const handleFormData = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let comment = {
            content: e.target.value,
            date: EasyDate.prototype.getRegDate(),
            userId: userId,
            postId: postId
        }
        setCommentData(comment)
    }

    return (
        <Body>
            <Content>
                <TextArea onChange={(e) => handleFormData(e)} />
                <p>{ }</p>
            </Content>
            <div>
                <a onClick={() => createComment(commentData)}>ADD</a>
            </div>
        </Body>
    )
}

export default CommentForm;