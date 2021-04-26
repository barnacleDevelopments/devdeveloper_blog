/*
AUTHOR: Devin Davis
DATE: January 27th, 2021
FILE: useCategories.tsx
*/

import { useState, useContext } from "react";
import Category from "../controllers/category_controller";

// CONTEXTS
import ErrorContext from "../contexts/ErrorContext";


/**
 * 
 * @param initialCategories 
 * @returns Category management utilities.
 * @description Category hook to to manage category state and make requests to controllers.
 */
const useCategories = (initialCategories: any) => {
    const [categories, setCategories] = useState<CategoryData[]>(initialCategories);
    const { addError } = useContext(ErrorContext);

    /**
     * 
     * @param name Category name.
     * @param desc Category description.
     * @description Makes a POST request containing a new category entry directed at the devdevloper_blog api.
     */
    const addCategory = async (name: string, desc: string) => {
        let adjustedCatList = categories;
        await Category.create(name, desc)
            .then(data => {
                adjustedCatList = [data, ...adjustedCatList]
                setCategories(adjustedCatList);
            })
            .catch(err => addError(err.message))
    }

    /**
     * 
     * @param catId Category ID.
     * @param name Category name.
     * @param desc Category description.
     * @description Makes a PUT request containing updates for a category entry directed at the devdevloper_blog api.
     */
    const updateCategory = async (catId: RessourceId, name: string, desc: string) => {
        await Category.update(catId, name, desc)
            .then((updatedCategory) => {
                let newCategories = categories.map(category => (
                    category._id === updatedCategory._id ? updatedCategory : category
                ))
                setCategories(newCategories);
            }).catch(err => addError(err.message));
    }

    /**
     * 
     * @param catId Category ID.
     * @description Makes a DELETE request to remove a category directed at the devdevloper_blog api.
     */
    const deleteCategory = async (catId: RessourceId) => {
        await Category.delete(catId)
            .then(() => {
                let newCatList = categories.filter(category => (
                    category._id === catId ? false : true
                ))
                setCategories(newCatList);
            }).catch(err => addError(err.message))
    }

    return {
        categories,
        addCategory,
        deleteCategory,
        updateCategory,
        setCategories
    }
}

export default useCategories;
