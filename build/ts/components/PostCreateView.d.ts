import React from "react";
import { UserComponentData } from "../interfaces/user_interfaces";
interface PostCreateViewComponent {
    user: UserComponentData;
}
declare const PostCreateView: React.FunctionComponent<PostCreateViewComponent>;
export default PostCreateView;
