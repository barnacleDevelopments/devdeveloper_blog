declare class Post {
    constructor();
    getOne(id: string): Promise<PostResponse>;
    create(title: string, content: string, catId: string, token: string): Promise<PostResponse>;
    update(id: string, newPost: EditPostData): Promise<PostResponse>;
    delete(id: string, catId: string): Promise<BasicResponse>;
}
export default Post;
