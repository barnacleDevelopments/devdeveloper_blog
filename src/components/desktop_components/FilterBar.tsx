/*
AUTHOR: Devin Davis
DATE: April 6th, 2021
FILE: FilterBar.tsx
*/

import React, { FunctionComponent, useState } from "react";
import styled from "@emotion/styled";

// COMPONENTS 
import Biscuit from "./Biscuit";

const Body = styled("div")`
    background-color: #314455;
    padding: 19px;
    border-radius: 4px;
    box-shadow: 1px 1px 5px 0px #00000030;
    h2 {
        color: #f5f5f5;
        font-weight: bold;
        font-size: 2em;
        margin-bottom: 14px;
    }
    h3 {
        color: #f5f5f5;
        font-weight: bold;
        font-size: 1.8em;
        margin-bottom: 14px;
        margin-top: 19px;
    }
    li:first-of-type {
        margin-left: 0px;
    }
`;

const BiscList = styled("ul")`
        text-decoration: none;

`;

interface FilterBarData {
    postList: PostData[],
    categoryList: CategoryData[],
    addActiveCategory(catId: string): void,
    removeActiveCategory(catId: string): void
}

const FilterBar: FunctionComponent<FilterBarData> = ({ postList, categoryList, addActiveCategory, removeActiveCategory }) => {

    return (
        <Body>
            <h2>Category: </h2>
            <BiscList>
                {categoryList.map(cat => {
                    return <Biscuit
                        addActiveCategory={addActiveCategory}
                        removeActiveCategory={removeActiveCategory}
                        textContent={cat.name}
                        catId={cat._id}
                    />
                })}
            </BiscList>
        </Body>
    );
}

export default FilterBar;