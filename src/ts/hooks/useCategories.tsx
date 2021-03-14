/*
AUTHOR: Devin Davis
DATE: January 27th, 2021
FILE: useCategories.tsx
*/

import { useState, useEffect, useContext } from "react";
import Category from "../controllers/category_controller";

// CONTEXTS
import ErrorContext from "../contexts/ErrorContext";
import useAuth from "./useAuth";


const useCategories = () => {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const { addError } = useContext(ErrorContext);
    const { getAccessTokenSilently } = useAuth();


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

    const addCategory = async (name: string, desc: string) => {
        let adjustedCatList = categories;

        try {
            const token = await getAccessTokenSilently();
            await Category.prototype.create(name, desc, token)
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

    const deleteCategory = async (catId: string) => {
        try {
            const token = await getAccessTokenSilently();
            await Category.prototype.delete(catId, token)
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

    const updateCategory = async (catId: string, name: string, desc: string) => {
        try {
            const token = await getAccessTokenSilently();
            await Category.prototype.update(catId, name, desc, token)
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

        } catch (error) {
            console.log(error)
            addError("Failed to authorize category update. Try login in again.")
        }
    }

    return {
        categories,
        addCategory,
        deleteCategory,
        updateCategory
    }
}

export default useCategories;
