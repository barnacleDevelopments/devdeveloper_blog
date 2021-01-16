import * as React from "react";
interface CommentFormComponent {
    createComment(comment: CommentFormData): void;
    userId: string;
    postId: string;
}
declare const CommentForm: React.FunctionComponent<CommentFormComponent>;
export default CommentForm;
