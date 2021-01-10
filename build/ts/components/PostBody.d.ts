import * as React from "react";
import { UserComponentData } from "../interfaces/user_interfaces";
export interface PostComponent {
    id: string;
    title: string;
    subTitle: string;
    content: string;
    user: UserComponentData;
}
declare const Post: React.FunctionComponent<PostComponent>;
export default Post;
