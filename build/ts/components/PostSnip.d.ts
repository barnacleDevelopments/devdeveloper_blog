import React from "react";
interface PostData {
    postId: string;
    title: string;
    content: string;
    user: UserComponentData;
    catId: string;
}
declare const PostSnip: React.FunctionComponent<PostData>;
export default PostSnip;
