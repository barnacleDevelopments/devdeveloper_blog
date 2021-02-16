/*
AUTHOR: Devin Davis
DATE: January 21st, 2021
FILE: ConfirmForm.tsx
*/

import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

//STYLES
const Body = styled("div")`
    width: 90%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    background-color: #9e5a63;
    padding: 14px;
    border-radius: 4px;
    
    p {
        grid-column: 1 / span 2;
        color: #f5f5f5;
    }
    
`;

const BtnContainer = styled("div")`
display: flex;
justify-content: flex-end;
width: 100%;
grid-column: 1 / span 2;
    a {
        display: flex;
        justify-content: center;
        padding: 9px;
        background-color: #97aabd;
        padding: 9px 14px;
        border-radius: 4px;
        margin-left: 10px;
        color: #f5f5f5;
        
    }
`;

const Shadow = styled("div")`
z-index: 1000000;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.500);
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
`;

// INTERFACES
interface ConfirmFormComponent {
    message: string,
    btnText: string,
    confirmHandler(): void,
    cancelHandler(): void
}

const ConfirmForm: FunctionComponent<ConfirmFormComponent> = ({ confirmHandler, cancelHandler, btnText, message }) => {
    return (
        <Shadow>
            <Body>
                <p>{message}</p>
                <BtnContainer>
                    <a onClick={cancelHandler}>Cancle</a>
                    <a onClick={confirmHandler}>{btnText}</a>
                </BtnContainer>

            </Body>
        </Shadow>

    )
}

export default ConfirmForm;