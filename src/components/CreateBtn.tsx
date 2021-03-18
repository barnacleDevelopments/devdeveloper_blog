/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: CreateBtn.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";

// FONT AWESOME 
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'


const Button = styled("a")`
    position: fixed;
    background-color: #97aabd;
    padding: 20px;
    color: #f5f5f5;
    border-radius: 50px;
    box-shadow: 1px 1px 5px 0px #00000040;
    bottom: 20px;
    right: 20px;
    z-index: 996;
    height: 70px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        color: #f5f5f5;
        font-size: 2.1em;
    }
`;

interface CreateBtnData {
    func(): void
}

const CreateBtn: React.FunctionComponent<CreateBtnData> = ({ func }) => {
    return (
        <Button onClick={func}>
            <Icon icon={faPlus} />
        </Button>
    )
}

export default CreateBtn;