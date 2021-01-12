import { PostData, NewPostData, EditPostData } from "../interfaces/post_interfaces";
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
declare class Post {
    constructor();
    getOne(id: string): Promise<PostData>;
    create(newPost: NewPostData, catId: string): Promise<ResponseStatus>;
    update(id: string, newPost: EditPostData): Promise<ResponseStatus>;
    delete(id: string, catId: string): Promise<ResponseStatus>;
}
export default Post;
