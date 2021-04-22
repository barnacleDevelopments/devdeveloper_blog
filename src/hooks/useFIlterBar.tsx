/*
AUTHOR: Devin Davis
DATE: April 9th, 2021
FILE: useFilterBar.tsx
*/

import { useEffect, useState } from "react"

const useFilterBar = (postList: PostData[]) => {
    const [activeCategories, setActiveCategories] = useState<string[]>([])
    const [updatedPostList, setUpdatedPostList] = useState<PostData[]>([])

    const addActiveCategory = (catId: string) => {
        setActiveCategories([...activeCategories, catId])
    }

    const removeActiveCategory = (catId: string) => {
        setActiveCategories(
            activeCategories.filter(activeCatId => activeCatId !== catId)
        )
    }

    useEffect(() => {
        const data = postList.filter(post => {
            if (activeCategories.includes(post.catId)) {
                return true;
            } else {
                return false
            }

        })

        setUpdatedPostList(data)

        if (activeCategories.length === 0) {
            setUpdatedPostList(postList);
        }
    }, [activeCategories, postList])

    return {
        activeCategories,
        updatedPostList,
        addActiveCategory,
        removeActiveCategory
    }
}

export default useFilterBar;
