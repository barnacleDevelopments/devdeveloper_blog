import { PostData, NewPostData, EditPostData } from "../interfaces/post_interfaces";
declare class Post {
    constructor();
    getAll(): Promise<undefined>;
    getOne(id: string): Promise<PostData>;
    create(newPost: NewPostData, catId: string): Promise<PostData>;
    update(id: string, newPost: EditPostData): Promise<void>;
    delete(id: string, catId: string): Promise<void>;
}
export default Post;
