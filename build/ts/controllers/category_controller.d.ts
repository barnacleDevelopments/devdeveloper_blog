import { PostData } from "./post_controller";
export interface CategoryData {
    _id: string;
    name: string;
    desc: string;
    count: number;
    img: string;
    posts: PostData[];
}
export interface NewCategoryData {
    name: string;
    desc: string;
}
declare class Category {
    constructor();
    getAll(): Promise<CategoryData[]>;
    getOne(id: string): Promise<CategoryData>;
    getPosts(id: string): Promise<CategoryData>;
    create(newCategory: NewCategoryData): Promise<NewCategoryData>;
    update(id: string, newCategory: NewCategoryData): Promise<void>;
    delete(id: string): Promise<void>;
}
export default Category;
