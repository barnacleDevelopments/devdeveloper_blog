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
declare class Category {
    constructor();
    getAll(): Promise<CategoryData[]>;
    getOne(id: string): Promise<CategoryData>;
    getPosts(id: string): Promise<PostData[]>;
    create(newCategory: NewCategoryData): Promise<NewCategoryData>;
    update(id: string, newCategory: NewCategoryData): Promise<void>;
    delete(id: string): Promise<ResponseStatus>;
}
export default Category;
