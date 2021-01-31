declare class Category {
    constructor();
    getAll(): Promise<CategoriesResponse>;
    getOne(id: string): Promise<CategoryResponse>;
    getPosts(id: string): Promise<PostsResponse>;
    create(name: string, desc: string): Promise<CategoryResponse>;
    update(id: string, name: string, desc: string): Promise<CategoryResponse>;
    delete(id: string): Promise<BasicResponse>;
}
export default Category;
