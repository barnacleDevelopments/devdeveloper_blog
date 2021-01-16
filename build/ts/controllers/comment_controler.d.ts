declare type ResponseStatus = {
    status: "success";
    message?: "";
} | {
    status: "failure";
    message?: "";
} | {
    status: "pending";
    message?: "";
};
declare class Comment {
    constructor();
    getFromPost(id: string): Promise<CommentComponentData[]>;
    create(userId: string, postId: string, newComment: NewCommentData): Promise<CommentComponentData>;
    update(id: string, newComment: NewCommentData): Promise<void>;
    delete(commentId: string, userId: string, postId: string): Promise<ResponseStatus>;
}
export default Comment;
