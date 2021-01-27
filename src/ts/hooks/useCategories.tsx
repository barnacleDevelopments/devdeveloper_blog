/*
AUTHOR: Devin Davis
DATE: January 27th, 2021
FILE: useCategories.tsx
*/

import { useState, useEffect } from "react";
import Category from "../controllers/category_controller";

const useCategories = () => {
    const [categories, setCategories] = useState<CategoryData[]>([]);

    // retrive all the categories
    useEffect(() => {
        Category.prototype.getAll()
            .then(data => setCategories(data))
            .catch(() => {

            })
    }, []);

    const addCategory = (newCat: CategoryData) => {
        let adjustedCatList = categories;
        adjustedCatList.push(newCat);
        setCategories(adjustedCatList);
    }

    const deleteCategory = (catId: string) => {
        Category.prototype.delete(catId)
            .then(() => {
                let newCatList = categories.filter(cat => cat._id === catId ? false : true);
                setCategories(newCatList);
            });
    }

    return {
        categories,
        addCategory,
        deleteCategory
    }
}

export default useCategories;
