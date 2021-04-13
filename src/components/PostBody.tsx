/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Post.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

// HOOKS
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";

const Body = styled("article")`
    border-radius: 4px;
    box-shadow: 1px 1px 5px 0px #00000040;
    margin-bottom: 14px;
    position: relative;
    min-width: 270px;

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
    @media (min-width: 1200px) {
        width: 70%;
    }
`;

const Content = styled("div")`
    color: #f5f5f5;
    background-color: #9E5A63;
    padding: 28px 20px 10px 20px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-bottom: 14px;
    position: relative;
    width: 100%;
   
    h1 {
        font-size: 2em;
        font-weight: bold;
        margin-bottom: 15px;
        font-weight: 800;
    }

    h2 {
        font-size: 1.5em;
        font-weight: 600;
        margin-bottom: 12px;
    }

    h3 {
        font-size: 1.3em;
        font-style: italic;
        font-weight: 600;
        margin-bottom: 10px;
    }

    p {
        font-size: 16px;
        font-weight: 100;
        line-height: 1.5;
        margin-bottom: 25px;
        font-weight: 100;
    }

    ul {
        margin: 20px 0px 20px 0px;
        padding-left: 25px;
        li {
            line-height: 30px;
            list-style-type: circle;
        }
    }

    a {
        text-decoration: none;
        color: #97aabd;
        border-bottom: 1px solid #97aabd;
    }

    a:visited {
        color: #97aabde6;
    }

    pre {
        background-color: #97aabd;
        padding: 14px 20px;
        color: #f5f5f5;
        border-radius: 4px;
        margin: 20px 0px 20px 0px;
        line-height: 2em;
        p {
            font-weight: 600;
        }
    }
`;

// INTERFACES
interface PostComponent {
    title: string,
    content: string,
}

const Post: React.FunctionComponent<PostComponent> = ({ title, content }) => {
    const router = useRouter();
    const { postId, catId } = router.query
    const { user, isLoading, isAdmin } = useAuth();
    return (
        <Body>
            <img src="../../img/logo.png" />
            <Content>
                <h1>{title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </Content>

            { (user && !isLoading && isAdmin) &&
                <Link href={`/posts/edit/${catId}/${postId}`}><i className="fas fa-pen fa-1x"></i></Link>}
        </Body>
    )
}

export default Post;