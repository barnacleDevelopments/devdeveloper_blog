import React from "react";
import { UserComponentData } from "../interfaces/user_interfaces";
interface CommentComponent {
    commentId: string;
    postId: string;
    content: string;
    date: string;
    username: string;
    user: UserComponentData;
}
declare const CommentBody: React.FunctionComponent<CommentComponent>;
export default CommentBody;
