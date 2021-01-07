import * as React from "react";
export interface PostComponent {
    id: string;
    title: string;
    subTitle: string;
    content: string;
    date: string;
    user: {
        role: string;
        status: boolean;
    };
}
declare const Post: React.FunctionComponent<PostComponent>;
export default Post;
