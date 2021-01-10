import { CommentData, NewCommentData } from "../interfaces/comment_interfaces";
declare class Comment {
    constructor();
    getFromPost(id: string): Promise<CommentData[]>;
    getOne(id: string): Promise<CommentData>;
    create(userId: string, postId: string, newComment: NewCommentData): Promise<NewCommentData[]>;
    update(id: string, newComment: NewCommentData): Promise<void>;
    delete(id: string): Promise<void>;
}
export default Comment;
