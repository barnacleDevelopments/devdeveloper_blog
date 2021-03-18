/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: TextProcessor.tsx
*/

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
// import { useForm } from "react-hook-form";

// INTERFACES
interface CategoryFormComponent {
    name: string,
    desc: string,
    btnText: string,
    submitFunc(data: NewCategoryData): void
    cancelFunc(): void
}

// STATELESS COMPONENTS
import { CancelBtn, ConfirmBtn } from "../stateless_components/buttons";

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

const Shadow = styled("div")`
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.500);
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    position: fixed;
`;

const Form = styled("form")`
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    background-color: #314455;
    gap: 14px;
    border-radius: 4px;
    width: 93%;
    padding: 14px;

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

    input {
        font-size: 1.2em;
        padding-left: 14px;
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
`;

const ButtonContainer = styled("div")`
    padding: 10px 0px 10px;
`;

const CategoryForm: React.FunctionComponent<CategoryFormComponent> = ({ name, desc, btnText, submitFunc, cancelFunc }) => {
    const { register, handleSubmit } = useForm()
    const [formData, setFormData] = useState<CategoryFormData>({
        name: name,
        desc: desc
    });

    const handleFormData = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        let data: CategoryFormData = formData;
        data[event.target.name] = event.target.value;
        setFormData(data);
    }

    const onSubmit = () => {
        submitFunc(formData)
        cancelFunc()
    }

    const categoryNameRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (categoryNameRef.current !== null) {
            register(categoryNameRef.current, { required: true })
            categoryNameRef.current.focus()
        }
    }, [])

    return (
        <Body>
            <Shadow onClick={cancelFunc}></Shadow>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* FORM INPUTS */}
                <input
                    name="name"
                    defaultValue={name}
                    onChange={handleFormData}
                    type="text"
                    ref={categoryNameRef}
                />
                <textarea
                    name="desc"
                    defaultValue={desc}
                    onChange={handleFormData}
                />
                <ButtonContainer>
                    <CancelBtn onClick={cancelFunc}>Cancel</CancelBtn>
                    <ConfirmBtn type="submit">{btnText}</ConfirmBtn>
                </ButtonContainer>
            </Form>
        </Body>
    )
}

export default CategoryForm;