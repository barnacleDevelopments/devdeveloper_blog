import * as React from "react";
interface PostComponent {
    postId: string;
    catId: string;
    title: string;
    content: string;
    user: UserComponentData;
}
declare const Post: React.FunctionComponent<PostComponent>;
export default Post;
