import * as React from "react";
import { UserComponentData } from "../interfaces/user_interfaces";
interface PostsViewComponent {
    user: UserComponentData;
}
declare const PostsView: React.FunctionComponent<PostsViewComponent>;
export default PostsView;
