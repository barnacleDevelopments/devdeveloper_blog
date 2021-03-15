/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: TextProcessor.tsx
*/

import React, { useRef, useEffect } from "react";
import { stateToHTML } from "draft-js-export-html";
import { useState } from 'react';
import styled from "@emotion/styled";
import { stateFromHTML } from "draft-js-import-html"

// STATES 
import { EditorState } from 'draft-js';

// COMPONENTS 
import { Editor } from "react-draft-wysiwyg";

// HOOKS 
import { useForm } from "react-hook-form";

// INTERFACES 

// STATELESS COMPONENTS
import { CancelBtn, ConfirmBtn } from "../stateless_components/buttons";

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
    const [editorState, setEditorState] = useState(
        () => EditorState.createWithContent(stateFromHTML(content)),
    );
    const [formData, setFormData] = useState<PostFormData>({
        title: title,
        content: content
    });

    const { register, handleSubmit } = useForm();

    const postTitleRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (postTitleRef.current !== null) {
            register(postTitleRef.current, {
                required: true,
                minLength: 6,
                maxLength: 20,
            })
            postTitleRef.current.focus()
        }
    }, [])

    const handleTitleData = (event: React.ChangeEvent<HTMLInputElement>) => {
        let data: PostFormData = formData;
        data.title = event.target.value;
        setFormData(data);
    }

    const handleTextData = (event: EditorState) => {
        setEditorState(event)
        let data: PostFormData = formData;
        data.content = stateToHTML(editorState.getCurrentContent())
        setFormData(data);
    }

    const handlePostSubmit = () => {
        submitFunc(formData)
        cancleFunc();
    }

    return (
        <Body style={{ height: "100%" }}>
            <Shadow onClick={cancleFunc}></Shadow>
            <Form onSubmit={handleSubmit(handlePostSubmit)} >
                <input name="title" ref={postTitleRef} onChange={handleTitleData} defaultValue={title} type="text" />
                {/* <textarea name="content" onChange={handleFormData} defaultValue={content} /> */}
                <Editor
                    wrapperStyle={{ width: "100%", backgroundColor: "#f5f5f5", height: "100%" }}
                    wrapperClassName="post-editor-wrapper"
                    editorClassName="post-editor"
                    toolbarClassName="post-toolbar"
                    editorState={editorState}
                    onEditorStateChange={handleTextData}
                    placeholder="Write article here..."
                    spellCheck={true}
                    stripPastedStyles={true}
                />
                <ButtonContainer>
                    <CancelBtn onClick={cancleFunc} >Cancle</CancelBtn>
                    <ConfirmBtn type="submit">{btnText}</ConfirmBtn>
                </ButtonContainer>
            </Form>
        </Body>
    )
}

export default PostForm;