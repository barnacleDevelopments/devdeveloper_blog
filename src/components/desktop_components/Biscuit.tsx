/*
AUTHOR: Devin Davis
DATE: April 6th, 2021
FILE: Snip.tsx
*/

import styled from "@emotion/styled";
import { FunctionComponent, useState } from "react";

const Body = styled("li")`
    width: fit-content;
    padding: 13px;
    border-radius: 20px;
    color: #f5f5f5;
    font-weight: bold;
    box-shadow: 1px 1px 5px 0px #00000030;
    display: inline-block;
    margin-left: 10px;
    margin-top: 10px;
    text-transform: capitalize;
`;


interface BiscuitData {
    catId: string,
    textContent: string,
    addActiveCategory(catId: string): void,
    removeActiveCategory(catId: string): void
}

const Biscuit: FunctionComponent<BiscuitData> = ({ catId, textContent, addActiveCategory, removeActiveCategory }) => {
    const [isActive, setIsActive] = useState(false);
    const [currentStyle, setCurrentStyle] = useState({ backgroundColor: "#9E5A63" })

    const toggleActiveState = () => {
        if (isActive) {
            setIsActive(false)
            setCurrentStyle({ backgroundColor: "#9E5A63" })
            removeActiveCategory(catId)
        } else {
            setIsActive(true);
            setCurrentStyle({ backgroundColor: "#97AABD" })
            addActiveCategory(catId)
        }

    }

    return (
        <Body onClick={toggleActiveState} style={currentStyle}>{textContent}</Body>
    );
}

export default Biscuit;