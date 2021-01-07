import * as React from "react";
import { NewPostData } from "../controllers/post_controller";
interface PostFormComponent {
    postId: string;
    title: string;
    subTitle: string;
    content: string;
    btnText: string;
    submitFunc(data: NewPostData): void;
}
declare const PostForm: React.FunctionComponent<PostFormComponent>;
export default PostForm;
