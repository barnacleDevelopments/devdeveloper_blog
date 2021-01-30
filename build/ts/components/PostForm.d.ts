import React from "react";
interface PostFormComponent {
    title: string;
    content: string;
    btnText: string;
    submitFunc(postData: PostFormData): void;
    cancleFunc(): void;
}
declare const PostForm: React.FunctionComponent<PostFormComponent>;
export default PostForm;
