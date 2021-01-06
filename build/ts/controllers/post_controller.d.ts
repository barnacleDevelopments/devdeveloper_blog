export interface PostData {
    _id: string;
    title: string;
    subTitle: string;
    content: string;
    catId: string;
    date: string;
}
export interface NewPostData {
    title: string;
    content: string;
    catId: string;
}
declare class Post {
    constructor();
    getAll(): Promise<undefined>;
    getOne(id: string): Promise<PostData>;
    create(newPost: NewPostData): Promise<NewPostData>;
    update(id: string, newPost: NewPostData): Promise<void>;
    delete(id: string): Promise<void>;
}
export default Post;
