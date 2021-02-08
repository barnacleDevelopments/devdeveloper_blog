/*
AUTHOR: Devin Davis
DATE: January 27th, 2021
FILE: useCategories.tsx
*/

import { useState, useEffect, useContext } from "react";
import Category from "../controllers/category_controller";

// CONTEXTS
import ErrorContext from "../contexts/ErrorContext";


const useCategories = () => {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const { addError } = useContext(ErrorContext);


    // retrive all the categories
    useEffect(() => {
        Category.prototype.getAll()
            .then(data => {
                if (data.status === "error") {
                    addError(data.message);
                } else {
                    setCategories(data.data)
                }
            })
    }, []);

    const addCategory = (name: string, desc: string) => {
        let adjustedCatList = categories;
        Category.prototype.create(name, desc)
            .then(data => {
                if (data.status === "error") {
                    addError(data.message);
                } else {
                    adjustedCatList = [data.data, ...adjustedCatList]
                    setCategories(adjustedCatList);
                }
            })
    }

    const deleteCategory = (catId: string) => {
        Category.prototype.delete(catId)
            .then((data) => {
                if (data.status === "error") {
                    addError(data.message || "");
                } else {
                    let newCatList = categories.filter(category => category._id === catId ? false : true);
                    setCategories(newCatList);
                }
            });
    }

    const updateCategory = (catId: string, name: string, desc: string) => {
        Category.prototype.update(catId, name, desc)
            .then((data) => {
                if (data.status === "error") {
                    addError(data.message);
                } else {
                    let newCategories = categories.map(category => {
                        if (category._id === data.data._id) {
                            return data.data;
                        } else {
                            return category;
                        }
                    })
                    setCategories(newCategories);
                }
            })
    }

    return {
        categories,
        addCategory,
        deleteCategory,
        updateCategory
    }
}

export default useCategories;
