/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: TextProcessor.tsx
*/

import * as React from "react";
import { useState } from "react";
import styled from "@emotion/styled";

// INTERFACES
interface CategoryFormComponent {
    name: string,
    desc: string,
    btnText: string,
    submitFunc(data: NewCategoryData): void
    cancleFunc(): void
}

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

const Form = styled("form")`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background-color: #314455;
    gap: 10px;
    border-radius: 4px;
    width: 90%;
    input {
        font-size: 1.2em;
        padding-left: 16px;
        color: #00000055;
        width: 100%;
        height: 40px;
        border-radius: 4px;
        background-color: #f5f5f5;
        text-transform: capitalize;
    }

    textarea {
        padding: 10px;
        color: #00000055;
        width: 100%;
        box-sizing: border-box;
        background-color: #f5f5f5;
        border: none;
        padding-left: 16px;
        font-family: 'Chivo', sans-serif;
    }

    a {
        color: #f5f5f5;
        background-color: #9e5a63;
        padding: 9px 14px 9px 14px;
        border-radius: 4px;
        text-decoration: none;
    }
`;


const ButtonContainer = styled("div")`
    padding: 10px 0px 10px;
    a {
        margin-left: 10px;
    }

`;



const CategoryForm: React.FunctionComponent<CategoryFormComponent> = ({ name, desc, btnText, submitFunc, cancleFunc }) => {
    const [formData, setFormData] = useState<CategoryFormData>({
        name: "",
        desc: ""
    });

    const handleFormData = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        let data: CategoryFormData = formData;
        data[event.target.name] = event.target.value;
        setFormData(data);
    }

    const handleSubmit = () => {
        submitFunc(formData)
        cancleFunc()
    }

    return (
        <Shadow>
            <Form>
                {/* FORM INPUTS */}
                <input name="name" defaultValue={name} onChange={handleFormData} type="text" />
                <textarea name="desc" defaultValue={desc} onChange={handleFormData} />
                <ButtonContainer>
                    <a onClick={cancleFunc}>Cancel</a>
                    <a onClick={handleSubmit}>{btnText}</a>
                </ButtonContainer>
            </Form>
        </Shadow>

    )
}

export default CategoryForm;