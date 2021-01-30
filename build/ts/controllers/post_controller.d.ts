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
    create(title: string, content: string, catId: string): Promise<PostData>;
    update(id: string, newPost: EditPostData): Promise<PostData>;
    delete(id: string, catId: string): Promise<ResponseStatus>;
}
export default Post;
