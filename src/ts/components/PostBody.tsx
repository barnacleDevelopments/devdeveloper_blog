/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Post.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Body = styled("article")`
    border-radius: 4px;
    box-shadow: 3px 3px 30px -20px black;
    margin-bottom: 14px;
    position: relative;
    img {
        width: 100%;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
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

const Content = styled("div")`
    color: #f5f5f5;
    background-color: #9E5A63;
    padding: 15px 13px 10px 13px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-bottom: 14px;
    position: relative;
    width: 100%;
   
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
        font-weight: 100;
        line-height: 1.5;
    }
`;

// ASSETS 
import CardPhoto from "../../img/logo.png"

// INTERFACES
interface PostComponent {
    postId: string,
    catId: string,
    title: string,
    content: string,
    user: UserComponentData
}

const Post: React.FunctionComponent<PostComponent> = ({ user, postId, catId, title, content }) => {

    return (
        <Body>
            <img src={CardPhoto} />
            <Content>
                <h1>{title}</h1>
                <p>{content}</p>
            </Content>

            {user.role === "administrator" ?
                <Link to={`/posts/edit/${catId}/${postId}`}><i className="fas fa-pen fa-1x"></i></Link> : null}
        </Body>
    )
}

export default Post;