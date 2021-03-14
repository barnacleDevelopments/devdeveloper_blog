declare class Category {
    constructor();
    getAll(): Promise<CategoriesResponse>;
    getOne(id: string): Promise<CategoryResponse>;
    getPosts(id: string): Promise<PostsResponse>;
    create(name: string, desc: string, token: string): Promise<CategoryResponse>;
    update(id: string, name: string, desc: string, token: string): Promise<CategoryResponse>;
    delete(id: string, token: string): Promise<BasicResponse>;
}
export default Category;
