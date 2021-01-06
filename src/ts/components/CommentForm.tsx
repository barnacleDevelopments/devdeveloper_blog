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
    username: string
}

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
       display: flex;
       align-items: flex-end;
    }
    a {
        display: block;
        background-color: #97aabd;
        padding: 9px 14px 9px 14px;
        height: 34px;
        text-align: center;
        border-radius: 4px;
        margin-bottom: 10px;
        margin-right: 10px;

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
    
`;

const Content = styled("div")`
    padding: 25px 15px 10px 15px;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const CommentForm: React.FunctionComponent<CommentFormComponent> = ({ username }) => {
    return (
        <Body>
            <h1>{username} Bob</h1>
            <Content>
                <TextArea />
                <p>{EasyDate.prototype.getRegDate()}</p>
            </Content>
            <div>
                <a>ADD</a>
            </div>
        </Body>
    )
}

export default CommentForm;