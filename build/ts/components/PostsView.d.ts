import * as React from "react";
interface PostsViewComponent {
    user: {
        status: boolean;
        role: string;
    };
}
declare const PostsView: React.FunctionComponent<PostsViewComponent>;
export default PostsView;
