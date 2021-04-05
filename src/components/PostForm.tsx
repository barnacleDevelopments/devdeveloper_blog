/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: TextProcessor.tsx
*/

// DEPENDENCIES
import React, { useRef } from "react";
import styled from "@emotion/styled";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

// HOOKS 
import { useForm } from "react-hook-form";

// STYLED COMPONENTS
import { CancelBtn, ConfirmBtn } from "../styled_components/buttons";
import { FormError } from "../styled_components/errors";

// VALIDATION SCHEMAS
let newPostSchema = yup.object().shape({
    title: yup.string().required().min(5).max(15),
    content: yup.string().required().min(50)
});

interface PostFormComponent {
    title: string,
    content: string,
    btnText: string,
    submitFunc(postData: PostFormData): void,
    cancleFunc(): void
}

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
    box-shadow: 1px 1px 5px 0px #00000030;
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

const PostForm: React.FunctionComponent<PostFormComponent> = ({ title, content, btnText, submitFunc, cancleFunc }) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(newPostSchema)
    });


    const postTitleInputRef = useRef<HTMLInputElement | null>(null);
    const { ref, ...rest } = register<any>('title');

    const handlePostSubmit = (data: any) => {
        submitFunc(data)
        cancleFunc();
    }

    return (
        <Body style={{ height: "100%" }}>
            {/* SHADOW OVERLAY */}
            <Shadow onClick={cancleFunc}></Shadow>
            {/* POST FORM */}
            <Form onSubmit={handleSubmit(handlePostSubmit)} >
                {/* TITLE INPUT */}
                <input
                    {...register("title")}
                    name="title"
                    type="text"
                    placeholder={title}
                    ref={(e) => {
                        ref(e)
                        postTitleInputRef.current = e;
                    }} />
                {<FormError>{errors.title && `${errors.title?.message}.`}</FormError>}
                {/* TEXT INPUT */}
                <textarea {...register("content")} name="content" placeholder={content} />
                {<FormError>{errors.content && `${errors.content?.message}.`}</FormError>}
                {/* FORM BUTTONS */}
                <ButtonContainer>
                    <CancelBtn onClick={cancleFunc} >Cancle</CancelBtn>
                    <ConfirmBtn type="submit">{btnText}</ConfirmBtn>
                </ButtonContainer>
            </Form>
        </Body>
    )
}

export default PostForm;