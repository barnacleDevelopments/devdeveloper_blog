import * as React from "react";
interface PostData {
    postId: string;
    title: string;
    content: string;
    user: UserComponentData;
    catId: string;
    deletePost(postId: string, catId: string): void;
}
declare const PostSnip: React.FunctionComponent<PostData>;
export default PostSnip;
