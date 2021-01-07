import * as React from "react";
interface PostView {
    user: {
        status: boolean;
        role: string;
    };
}
declare const PostView: React.FunctionComponent<PostView>;
export default PostView;
