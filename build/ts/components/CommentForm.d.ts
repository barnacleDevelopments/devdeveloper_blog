import * as React from "react";
interface CommentFormComponent {
    createComment(comment: CommentFormData): void;
}
declare const CommentForm: React.FunctionComponent<CommentFormComponent>;
export default CommentForm;
