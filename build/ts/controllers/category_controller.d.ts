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
