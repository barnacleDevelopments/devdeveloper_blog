/*
AUTHOR: Devin Davis
DATE: March 14th, 2021
FILE: buttons.tsx
*/

import styled from "@emotion/styled";

export const CancelBtn = styled("button")`
    margin-left: 10px;
    color: #f5f5f5;
    background-color: #97aabd;
    padding: 11px 18px 11px 18px;
    border-radius: 4px;
    text-decoration: none;
    border: none;
    box-shadow: 1px 1px 5px 0px #00000030;
    font-size: 1.01em;
`;

export const ConfirmBtn = styled("button")`
    margin-left: 10px;
    color: #f5f5f5;
    background-color: #9e5a63;
    padding: 11px 18px 11px 18px;
    border-radius: 4px;
    text-decoration: none;
    border: none;
    box-shadow: 1px 1px 5px 0px #00000030;
    font-size: 1.01em;
    :disabled {
        background-color: #97aabd;
        opacity: .5;
    }
`;

export const CardBtn = styled("button")`
    margin-left: 10px;
    color: #f5f5f5;
    background-color: #9e5a63;
    padding: 11px 27px 11px 27px;
    border-radius: 4px;
    text-decoration: none;
    border: none;
    box-shadow: 1px 1px 5px 0px #00000030;
    font-size: 1.01em;
    a {
        text-decoration: none;
        color: #f5f5f5;
    }
   
`;

export const DeleteBtn = styled("a")`
    position: absolute;
    right: -16px;
    top: 35px;
    background-color: #97aabd;
    padding: 10px;
    border-radius: 100px;
    color: #f5f5f5;
    height: 35px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 3px 3px 50px -12px black;
`;

export const EditBtn = styled("a")`
    position: absolute;
    right: -19px;
    top: -14px;
    background-color: #97aabd;
    padding: 10px;
    border-radius: 100px;
    color: #f5f5f5;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 3px 3px 50px -12px black;
`;