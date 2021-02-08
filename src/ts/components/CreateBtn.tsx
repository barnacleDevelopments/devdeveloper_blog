/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: CreateBtn.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";

const Button = styled("a")`
    position: fixed;
    background-color: #97aabd;
    padding: 20px;
    color: #f5f5f5;
    border-radius: 50px;
    box-shadow: 3px 3px 30px -10px black;
    bottom: 20px;
    right: 20px;
    z-index: 996;
    height: 70px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface CreateBtnData {
    func(): void
}

const CreateBtn: React.FunctionComponent<CreateBtnData> = ({ func }) => {
    return (
        <Button onClick={func}>
            <i className="fas fa-plus fa-2x"></i>
        </Button>
    )
}

export default CreateBtn;