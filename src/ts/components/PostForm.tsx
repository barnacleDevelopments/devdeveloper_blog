/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: TextProcessor.tsx
*/

import * as React from "react";
import { useState, useEffect } from 'react';
import styled from "@emotion/styled";
import { Link, useParams } from "react-router-dom";


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

const PostForm = ({ postId, title, subTitle, content, btnText, submitFunc }) => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: title,
        subTitle: subTitle,
        content: content,
        catId: id

    });

    const handleFormData = (e) => {
        let data = formData;
        data[e.target.name] = e.target.value;
        setFormData(data);
    }

    const handleSubmit = () => {
        submitFunc(formData);
    }

    return (
        <Body>
            <input name="title" onChange={handleFormData} placeholder={title} type="text"/>
            {subTitle ? <input placeholder={subTitle} type="text"/> : null}
            <textarea name="content" onChange={handleFormData} placeholder={content} />
            <Link to={postId ? `"/posts/${postId}"` : `/categories/posts/${id}`} onClick={handleSubmit}>{btnText}</Link>
        </Body>
    )
}

export default PostForm;