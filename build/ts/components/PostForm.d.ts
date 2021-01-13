import * as React from "react";
interface PostFormComponent {
    postId?: string;
    title: string;
    subTitle: string;
    content: string;
    btnText: string;
    catId?: string;
    isSubmited: boolean;
    submitFunc(data: PostFormData): void;
}
declare const PostForm: React.FunctionComponent<PostFormComponent>;
export default PostForm;
