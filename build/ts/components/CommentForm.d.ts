import * as React from "react";
import { CommentFormData } from "../interfaces/comment_interfaces";
interface CommentFormComponent {
    createComment(comment: CommentFormData): void;
}
declare const CommentForm: React.FunctionComponent<CommentFormComponent>;
export default CommentForm;
