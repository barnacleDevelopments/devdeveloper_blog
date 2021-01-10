import React from "react";
import { UserComponentData } from "../interfaces/user_interfaces";
interface PostView {
    user: UserComponentData;
}
declare const PostView: React.FunctionComponent<PostView>;
export default PostView;
