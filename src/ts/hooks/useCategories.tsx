/*
AUTHOR: Devin Davis
DATE: January 27th, 2021
FILE: useCategories.tsx
*/

import { useState, useEffect } from "react";
import Category from "../controllers/category_controller";

const useCategories = () => {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [errorMessage, setErrorMessage] = useState<String>()
    // retrive all the categories
    useEffect(() => {
        Category.prototype.getAll()
            .then(data => {
                if (data.status === "error") {
                    setErrorMessage(data.message);
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
                    setErrorMessage(data.message);
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
                    setErrorMessage(data.message);
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
                    setErrorMessage(data.message);
                } else {
                    let newCategories = categories.map(category => {
                        if (category._id === data.data._id) {
                            console.log(data.data)
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
        updateCategory,
        errorMessage
    }
}

export default useCategories;
