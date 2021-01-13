/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: TextProcessor.tsx
*/

import * as React from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";

// INTERFACES
interface CategoryFormComponent {
    name: string,
    desc: string,
    btnText: string,
    isSubmited: boolean,
    submitFunc(data: NewCategoryData): void
}

const Body = styled("form")`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background-color: #314455;
    gap: 10px;
    border-radius: 4px;
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
        border-radius: 4px;
    }

    a {
        color: #f5f5f5;
        background-color: #9e5a63;
        padding: 9px 14px 9px 14px;
        border-radius: 4px;
        text-decoration: none;
    }
`;



const CategoryForm: React.FunctionComponent<CategoryFormComponent> = ({ name, desc, btnText, submitFunc, isSubmited }) => {
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
    }

    return (
        <Body>
            {isSubmited ? <Redirect to={`/categories`} /> : null}
            <input name="name" onChange={handleFormData} placeholder={name} type="text" />
            <textarea name="desc" onChange={handleFormData} placeholder={desc} />
            <a onClick={handleSubmit}>{btnText}</a>
        </Body>
    )
}

export default CategoryForm;