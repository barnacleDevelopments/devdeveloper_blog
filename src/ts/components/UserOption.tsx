/*
AUTHOR: Devin Davis
DATE: Febuary 15th, 2021
FILE: UserOption.tsx
*/
import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

const Body = styled("div")`
    background-color: #9e5a63;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    padding: 16px;
    color: #f5f5f5;
    font-weight: 600;
    font-size: 1.4em;
    margin-bottom: 14px;
    box-shadow: 1px 1px 5px 0px #00000040;
    align-items: center;
    button {
        color: #f5f5f5;
        background-color: #97aabd;
        padding: 9px 14px 9px 14px;
        border-radius: 4px;
        text-decoration: none;
        border: none;
        box-shadow: 1px 1px 5px 0px #00000040;
        font-weight: 600;
    }
`;

interface UserOptionProps {
    name: string,
    btnContent: string,
    btnFunc?(): void
}

const UserOption: FunctionComponent<UserOptionProps> = ({ name, btnContent, btnFunc }) => {



    return (
        <Body>
            <h2>{name}</h2>
            <button onClick={btnFunc}>{btnContent}</button>
        </Body>
    )
}

export default UserOption;