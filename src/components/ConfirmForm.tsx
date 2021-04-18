/*
AUTHOR: Devin Davis
DATE: January 21st, 2021
FILE: ConfirmForm.tsx
*/

import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

//STYLES
const Body = styled("div")`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    z-index: 998;
`;

const Form = styled("form")`
    z-index: 998;
    width: 93%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    background-color: #314455;
    padding: 16px 20px;
    border-radius: 4px;
    @media (min-width: 576px) {
        width: 85%;
    }

    @media (min-width: 768px) {
        width: 75%;
    }

    @media (min-width: 992px) {
        width: 65%;
    }

    @media (min-width: 1200px) {
        width: 50%;
    }
    p {
        grid-column: 1 / span 2;
        color: #f5f5f5;
        font-size: 1.2em;   
        font-weight: 500;
        text-align: left;
    }
  
    
`;

const BtnContainer = styled("div")`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    grid-column: 1 / span 2;
`;

const Shadow = styled("div")`
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.500);
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    position: fixed;
`;

// STATELESS COMPONENTS
import { CancelBtn, ConfirmBtn } from "../styled_components/buttons";

// INTERFACES
interface ConfirmFormComponent {
    message: string,
    btnText: string,
    confirmHandler(): void,
    cancelHandler(): void
}

const ConfirmForm: FunctionComponent<ConfirmFormComponent> = ({ confirmHandler, cancelHandler, btnText, message }) => {
    return (
        <Body>
            <Shadow></Shadow>
            <Form>
                <p>{message}</p>
                <BtnContainer>
                    <CancelBtn onClick={cancelHandler}>Cancle</CancelBtn>
                    <ConfirmBtn onClick={confirmHandler}>{btnText}</ConfirmBtn>
                </BtnContainer>

            </Form>
        </Body>
    )
}

export default ConfirmForm;