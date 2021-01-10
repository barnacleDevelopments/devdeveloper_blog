/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Post.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Body = styled("article")`
    color: #f5f5f5;
    background-color: #9E5A63;
    padding: 15px 13px 10px 13px;
    text-align: center;
    border-radius: 4px;
    box-shadow: 3px 3px 30px -20px black;
    margin-bottom: 14px;
    position: relative;

    img {
        margin: 15px 0px 15px 0px;
    }

    h1 {
        font-size: 2em;
        font-weight: bold;
    }

    h2 {
        font-size: 1.1em;
        font-style: italic;
    }

    p {
        font-size: 16px;
        text-align: left;
        font-weight: 100;
        line-height: 1.5;
    }
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
`;

// INTERFACES
import { UserComponentData } from "../interfaces/user_interfaces";

export interface PostComponent {
    id: string,
    title: string,
    subTitle: string,
    content: string,
    user: UserComponentData
}

const Post: React.FunctionComponent<PostComponent> = ({ user, id, title, subTitle, content }) => {
    return (
        <Body>
            <h1>{title}</h1>
            <h2>{subTitle}</h2>
            <img src="/" />
            <p>{content}</p>
            {user.role === "administrator" ?
                <Link to={`/posts/edit/${id}`}><i className="fas fa-pen fa-1x"></i></Link> : null}
            {user.role === "administrator" ?
                <Link to={`/posts/delete/${id}`}><i className="far fa-trash-alt"></i></Link> : null}
        </Body>
    )
}

export default Post;