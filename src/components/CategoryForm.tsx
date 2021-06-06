/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: TextProcessor.tsx
*/

import React from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

// INTERFACES
interface CategoryFormComponent {
    name: string,
    desc: string,
    btnText: string,
    submitFunc(data: CategoryFormData): void
    cancelFunc(): void
}



// STATELESS COMPONENTS
import { CancelBtn, ConfirmBtn } from "../styled_components/buttons";
import { FormError } from "../styled_components/errors"

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
        font-weight: 500;
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

// create validation schema 
const categorySchema: any = yup.object().shape({
    name: yup.string().required().min(4).max(20),
    desc: yup.string().required().min(16).max(50)
})

const CategoryForm: React.FunctionComponent<CategoryFormComponent> = ({ name, desc, btnText, submitFunc, cancelFunc }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<CategoryInputData>({
        resolver: yupResolver(categorySchema),
        defaultValues: { name, desc }
    })

    const onSubmit = (data: any) => {
        submitFunc(data)
        cancelFunc() // close form
    }


    return (
        <Body>
            <Shadow onClick={cancelFunc}></Shadow>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {/* FORM INPUTS */}
                <input
                    ref={register}
                    name="name"
                    type="text"
                    placeholder={"Category Name..."}
                    defaultValue={name}

                />
                {<FormError>{errors.name && `${errors.name?.message}.`}</FormError>}
                <textarea
                    ref={register}
                    name="desc"
                    placeholder={"Category Description..."}
                    defaultValue={desc}
                />
                {<FormError>{errors.desc && `${errors.desc?.message}.`}</FormError>}

                <ButtonContainer>
                    <CancelBtn onClick={cancelFunc}>Cancel</CancelBtn>
                    <ConfirmBtn type="submit">{btnText}</ConfirmBtn>
                </ButtonContainer>
            </Form>
        </Body>
    )
}

export default CategoryForm;