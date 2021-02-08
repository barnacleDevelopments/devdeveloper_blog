/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: TextProcessor.tsx
*/

import React from "react";
import { useState } from 'react';
import styled from "@emotion/styled";


// INTERFACES 
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



const PostForm: React.FunctionComponent<PostFormComponent> = ({ title, content, btnText, submitFunc, cancleFunc }) => {

    const [formData, setFormData] = useState<PostFormData>({
        title: title,
        content: content
    });

    const handleFormData = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        let data: PostFormData = formData;
        data[event.target.name] = event.target.value;
        setFormData(data);
    }

    const handleSubmit = () => {
        submitFunc(formData)
        cancleFunc();
    }

    return (
        <Body>
            <Shadow onClick={cancleFunc}>  </Shadow>
            <Form>
                <input name="title" onChange={handleFormData} defaultValue={title} type="text" />
                <textarea name="content" onChange={handleFormData} defaultValue={content} />
                <ButtonContainer>
                    <a onClick={handleSubmit}>{btnText}</a>
                    <a onClick={cancleFunc} >Cancle</a>
                </ButtonContainer>
            </Form>
        </Body>



    )
}

export default PostForm;