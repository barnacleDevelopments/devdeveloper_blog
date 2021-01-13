/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: TextProcessor.tsx
*/

import * as React from "react";
import { useState } from 'react';
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";

// INTERFACES 
interface PostFormComponent {
    postId?: string,
    title: string,
    subTitle: string,
    content: string,
    btnText: string,
    catId?: string,
    isSubmited: boolean,
    submitFunc(data: PostFormData): void
}


const Body = styled("article")`
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
    }

    a {
        color: #f5f5f5;
        background-color: #9e5a63;
        padding: 9px 14px 9px 14px;
        border-radius: 4px;
        text-decoration: none;
    }
`;


const PostForm: React.FunctionComponent<PostFormComponent> = ({ catId, title, subTitle, content, btnText, submitFunc, isSubmited }) => {


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
        submitFunc(formData);
    }

    return (
        <Body>
            {isSubmited ? <Redirect to={`/categories/posts/${catId}`} /> : null}
            <input name="title" onChange={handleFormData} defaultValue={title} type="text" />
            {subTitle ? <input defaultValue={subTitle} type="text" /> : null}
            <textarea name="content" onChange={handleFormData} defaultValue={content} />
            <a onClick={handleSubmit}>{btnText}</a>
        </Body>
    )
}

export default PostForm;