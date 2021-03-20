/*
AUTHOR: Devin Davis
DATE: January 27th, 2021
FILE: useCategories.tsx
*/

import { useState, useContext } from "react";
import Category from "../controllers/category_controller";
import { RessourceId } from "../customTypings/global_types";

// CONTEXTS
import ErrorContext from "../contexts/ErrorContext";

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
        try {

            await Category.prototype.create(name, desc)
                .then(data => {
                    if (data.status === "error") {
                        addError(data.message);
                    } else {
                        adjustedCatList = [data.data, ...adjustedCatList]
                        setCategories(adjustedCatList);
                    }
                })
        } catch (error) {
            console.log(error)
            addError("Failed to authorize category creation. Try login in again.")
        }
    }

    /**
     * 
     * @param catId Category ID.
     * @description Makes a DELETE request to remove a category directed at the devdevloper_blog api.
     */
    const deleteCategory = async (catId: RessourceId) => {
        try {
            await Category.prototype.delete(catId)
                .then((data) => {
                    if (data.status === "error") {
                        addError(data.message || "");
                    } else {
                        let newCatList = categories.filter(category => category._id === catId ? false : true);
                        setCategories(newCatList);
                    }
                });
        } catch (error) {
            console.log(error)
            addError("Failed to authorize category deletion. Try login in again.")
        }
    }

    /**
     * 
     * @param catId Category ID.
     * @param name Category name.
     * @param desc Category description.
     * @description Makes a PUT request containing updates for a category entry directed at the devdevloper_blog api.
     */
    const updateCategory = async (catId: RessourceId, name: string, desc: string) => {
        try {
            await Category.prototype.update(catId, name, desc)
                .then((data) => {
                    if (data.status === "error") {
                        addError(data.message);
                    } else {
                        console.log(categories)
                        let newCategories = categories.map(category => {
                            console.log(data)
                            if (category._id === data.data._id) {
                                return data.data;
                            } else {
                                return category;
                            }
                        })
                        setCategories(newCategories);
                    }
                })

        } catch (error) {
            console.log(error)
            addError("Failed to authorize category update. Try login in again.")
        }
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
