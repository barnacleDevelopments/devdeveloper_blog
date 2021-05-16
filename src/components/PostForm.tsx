/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: TextProcessor.tsx
*/

// DEPENDENCIES
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

// HOOKS 
import { useForm } from "react-hook-form";

// COMPONENTS 
import EditBar from "./EditBar";

// STYLED COMPONENTS
import { CancelBtn, ConfirmBtn } from "../styled_components/buttons";
import { FormError } from "../styled_components/errors";

// VALIDATION SCHEMAS
let newPostSchema: any = yup.object().shape({
    title: yup.string().required().min(5).max(15),
    content: yup.string().required().min(50),
    catId: yup.string().required()
});

let updatePostSchema: any = yup.object().shape({
    title: yup.string().required().min(5).max(15),
    content: yup.string().required().min(50),
})

interface PostFormComponent {
    title?: string,
    content?: string,
    btnText: string,
    categoryList?: CategoryData[],
    submitFunc(postData: PostFormData): void,
    cancelFunc(): void,
    includesCategoryPicker: boolean
}

type PostInputData = {
    [index: string]: string,
    title: string,
    content: string,
    catId: string
}

const Body = styled("div")`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
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
    background-color: #f5f5f5;
    gap: 14px;
    border-radius: 4px;
    width: 100%;
    box-shadow: 1px 1px 5px 0px #00000030;
    height: 100%;

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
        height: 100%;
    }
`;



const ButtonContainer = styled("div")`
    padding: 10px 0px 10px;
    background-color: #314455; 
    width: 100%;
    position: absolute;
    bottom: 0px;
    padding-right: 14px;
    button {
        float: right;
    }
`;

const TextInputBody = styled("div")`
    font-size: 1.3em;
    height:100%;
    width: 100%;
    outline: none;
    line-height: 1.3em;
    overflow: scroll;
    padding: 60px 30px;
    word-wrap: break-word;
    h1 {
        font-size: 2em;
        line-height: 2em;
    }
    h2 {
        font-size: 1.6em;
        line-height: 2em;
    }
    b {
        font-weight: 600;
    }
    i {
        font-style: italic;
    }
`;

const PostForm: React.FunctionComponent<PostFormComponent> = ({ categoryList, title, content, btnText, submitFunc, cancelFunc, includesCategoryPicker }) => {
    const [isCap, setIsCap] = useState(false);
    const [controlIsPressed, setControlIsPressed] = useState<boolean>(true);
    const [textBodyContent, setTextBodyContent] = useState("");
    const textBody: any = useRef(null);

    const handlePostSubmit = () => {
        let data = {
            title: textBody.current.firstElementChild.textContent,
            content: ""
        }

        textBody.current.removeChild(textBody.current.firstElementChild)

        data.content = textBody.current.innerHTML

        submitFunc(data)
        cancelFunc();
    }

    const handleKeyDown = (e: any) => {

        if (e.key === "Control") {
            setControlIsPressed(true)
        }

        if (controlIsPressed && e.key === "b") {
            e.preventDefault();
            document.execCommand("bold", false)
        }

        if (controlIsPressed && e.key === "i") {
            e.preventDefault();
            document.execCommand("italic", false)
        }

        if (controlIsPressed && e.key === "u") {
            e.preventDefault();
            document.execCommand("underline", false)
        }
    }

    const handleKeyUp = (e: any) => {
        if (e.key === "Control") {
            setControlIsPressed(false);
        }

        if (e.getModifierState("CapsLock")) {

            setIsCap(true);
            console.log(isCap)
        } else {

            setIsCap(false);
            console.log(isCap)
        }
    }

    const focusTextBody = () => textBody.current.focus()

    useEffect(() => {
        if (textBody.current.textContent === ("" || " ")) {
            document.execCommand("removeFormat", false);
        }

    }, [textBody.current?.textContent]);

    return (
        <Body style={{ height: "100%" }}>
            {/* SHADOW OVERLAY */}
            <Shadow onClick={cancelFunc}></Shadow>
            {/* POST FORM */}
            <Form onSubmit={handlePostSubmit} >

                {/* TITLE INPUT */}
                {/* <input
                        ref={register}
                        name="title"
                        type="text"
                        placeholder={"Post Title..."}
                        defaultValue={title}
                    /> */}

                {/* EDIT BAR */}
                <EditBar isCap={isCap} focusTextBody={focusTextBody} />

                {/* CONTENT INPUT */}
                <TextInputBody
                    ref={textBody}
                    onInput={() => setTextBodyContent(textBody.current.textContent)}
                    contentEditable="true"
                    placeholder={"Post Content..."}
                    defaultValue={content}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                />
                {includesCategoryPicker && (
                    <select
                        name="catId"
                    >
                        {categoryList?.map(cat => (
                            <option
                                key={cat._id}
                                value={cat._id}>{cat.name}
                            </option>
                        ))}
                    </select>
                )}

                {/* FORM BUTTONS */}
                <ButtonContainer>
                    <ConfirmBtn type="submit" >{btnText}</ConfirmBtn>
                    <CancelBtn onClick={cancelFunc} >Cancle</CancelBtn>
                </ButtonContainer>
            </Form>

        </Body>
    )
}

export default PostForm;