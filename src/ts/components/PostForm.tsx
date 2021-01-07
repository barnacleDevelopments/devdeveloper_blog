/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: TextProcessor.tsx
*/

import * as React from "react";
import { useState } from 'react';
import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";

// INTERFACES 
import { NewPostData } from "../controllers/post_controller";

interface PostFormComponent {
    postId: string,
    title: string,
    subTitle: string,
    content: string,
    btnText: string,
    submitFunc(data: NewPostData): void
}

interface PostFormData {
    [index: string]: string,
    title: string,
    subTitle: string,
    content: string,
    catId: string
}

interface ParamTypes {
    id: string
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


const PostForm: React.FunctionComponent<PostFormComponent> = ({ postId, title, subTitle, content, btnText, submitFunc }) => {
    const { id } = useParams<ParamTypes>();

    const [formData, setFormData] = useState<PostFormData>({
        title: "",
        subTitle: "",
        content: "",
        catId: ""
    });

    const handleFormData = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        let data: PostFormData = formData;
        data[event.target.name] = event.target.value;
        data.catId = id
        setFormData(data);
    }

    const handleSubmit = () => {
        submitFunc(formData);
    }

    return (
        <Body>
            <input name="title" onChange={handleFormData} placeholder={title} type="text" />
            {subTitle ? <input placeholder={subTitle} type="text" /> : null}
            <textarea name="content" onChange={handleFormData} placeholder={content} />
            <Link to={postId ? `"/posts/${postId}"` : `/categories/posts/${id}`} onClick={handleSubmit}>{btnText}</Link>
        </Body>
    )
}

export default PostForm;