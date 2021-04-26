/**
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: Comment.tsx
*/

// DEPENDENCIES
import React from "react";
import styled from "@emotion/styled";

// HOOKS
import useAuth from "../hooks/useAuth";

// FONT AWESOME 
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { useRouter } from "next/router";

// INTERFACES 
interface CommentComponent {
    commentId: string,
    content: string,
    date: string,
    username: string,
    deleteComment(commendId: RessourceId, postId: RessourceId): void
}

// STYLES
const Body = styled("article")`
    box-shadow: 1px 1px 5px 0px #00000030;
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
const CommentBody: React.FunctionComponent<CommentComponent> = ({ commentId, content, date, username, deleteComment }) => {
    const { isAdmin, isLoading, user } = useAuth();

    const router = useRouter();
    const { postId } = router.query;

    return (
        <Body>
            <h1>{username}</h1>
            <Content>
                <p>{content}</p>
                <p>{date}</p>
            </Content>
            <div>
                {(user && isAdmin && !isLoading) &&
                    <a onClick={() => deleteComment(commentId, postId ?? "")
                    }><Icon icon={faTrash} /></a>}
            </div>
        </Body>
    )
}

export default CommentBody;