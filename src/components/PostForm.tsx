/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: TextProcessor.tsx
*/

// DEPENDENCIES
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
// import * as yup from "yup"
// import { yupResolver } from "@hookform/resolvers/yup";

// COMPONENTS 
import EditBar from "./EditBar";

// STYLED COMPONENTS
import { CancelBtn, ConfirmBtn } from "../styled_components/buttons";
// import { FormError } from "../styled_components/errors";
// import Category from "../controllers/category_controller";
// import Post from "../controllers/post_controller";

// VALIDATION SCHEMAS
// let newPostSchema: any = yup.object().shape({
//     title: yup.string().required().min(5).max(15),
//     content: yup.string().required().min(50),
//     catId: yup.string().required()
// });

// let updatePostSchema: any = yup.object().shape({
//     title: yup.string().required().min(5).max(15),
//     content: yup.string().required().min(50),
// })

interface PostFormComponent {
    title?: string,
    content?: string,
    btnText: string,
    categoryList?: CategoryData[],
    submitFunc(postData: PostFormData): void,
    cancelFunc(): void,
    includesCategoryPicker: boolean
}

// type PostInputData = {
//     [index: string]: string,
//     title: string,
//     content: string,
//     catId: string
// }

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
    padding: 80px 30px;
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

const TextAreaInput = styled("div")`
    height: 100%;
    position: relative;
    color: black;

`;


const useContentEditable = () => {

    const [isCap, setIsCap] = useState(false);
    const [controlIsPressed, setControlIsPressed] = useState<boolean>(false);
    const textAreaInput: any = useRef(null);
    const [textAreaInputText] = useState<string>(textAreaInput.value)
    // const [currentListType, setCurrentListType] = useState<string>()
    // const [categories, setCategories] = useState<CategoryData[]>([])
    // const [posts, setPosts] = useState([])

    // const [currentCursorPosition, setCurrentCursorPosition] = useState<any>()

    useEffect(() => {
        focusTextAreaInput()
    })


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
        setControlIsPressed(false)
        if (e.getModifierState("CapsLock")) {

            setIsCap(true);
        } else {

            setIsCap(false);
        }
    }

    // focuses user input into editiable content div
    const focusTextAreaInput = () => {
        textAreaInput.current.focus()
        // removeExistingLists()
    };

    // // removes any existing appended list elements 
    // const removeExistingLists = () => {
    //     const selectLists = document.getElementsByClassName("selectList")
    //     for (var l of selectLists) {
    //         l.remove()
    //     }
    // }

    // const focusCurrentList = () => {
    //     const selectList = document.querySelector(".selectList")

    // }

    // // detexts when user inputs cateogory or post and prompts them to add a link to that particular item. 
    // const appendList = async (e: any) => {
    //     const textNode = window.getSelection()?.focusNode;

    //     // check if input text is entity type and return the type
    //     const detectEntityType = () => {
    //         const listTypes = ["category", "post"]; // types of lists 

    //         const textStr = textNode?.textContent // textNode value 

    //         const textArr = textNode?.textContent?.split(" ") // split text 

    //         console.log(textArr)


    //         const promise = new Promise((resolve, reject) => {
    //             for (let w of textArr) {
    //                 for (let t of listTypes) {
    //                     if (`${w.toLowerCase()}` === `:${t}`) {

    //                         setCurrentListType(t)
    //                         setTextAreaInputText(textStr.replace(`:${t}`, `${t.toUpperCase()}`))
    //                         resolve(t);
    //                     }
    //                 }
    //             }
    //         })

    //         return promise;
    //     }

    //     // retrieve enties if they don't exist in state and create them 
    //     const retrieveTypeList = async (type: string | undefined) => {

    //         const promise = new Promise((resolve, reject) => {
    //             if (type === "category") {
    //                 categories.length === 0 ? Category.getAll()
    //                     .then(data => resolve(data)) : null;
    //             }

    //             if (type === "post") {
    //                 posts.length === 0 ? Post.getAll()
    //                     .then(data => resolve(data)) : null
    //             }
    //         })

    //         return promise;
    //     }

    //     // create a HTML collection of all the entities
    //     const createSelectList = (entityList: any) => {
    //         const entitySelectList = document.createElement("select");
    //         entitySelectList.setAttribute("style", "position: absolute; bottom: -10px")
    //         entitySelectList.setAttribute("contentEditable", "false")

    //         for (let e of entityList) {
    //             let newOption = document.createElement("option")

    //             newOption.textContent = e.name || e.title
    //             newOption.value = e._id
    //             entitySelectList.append(newOption)

    //         }

    //         return entitySelectList;

    //     }

    //     // position cursor at the end 
    //     const positionCursor = () => {

    //         const cursor = window.getSelection();

    //         const rangeObj = document.createRange();

    //         const textLength = cursor?.anchorNode?.nodeValue?.length

    //         rangeObj.setStart(cursor?.focusNode?.parentElement.childNodes[0], textLength);

    //         cursor?.removeAllRanges()

    //         rangeObj.collapse(true);

    //         cursor?.addRange(rangeObj)
    //     }

    //     const transformToLink = (linkText: any, link: any) => {
    //         removeExistingLists()

    //         const cursor = window.getSelection();
    //         const textArr = cursor?.focusNode.textContent.split(" ")
    //         const textStr = cursor?.focusNode.textContent

    //         console.log(textStr)

    //         for (let w of textArr) {
    //             if (w.toLowerCase() === currentListType)
    //                 setTextAreaInputText(textStr.replace(`${w?.toUpperCase()}`, `<a href="/posts/${link}">${linkText}</a>`))
    //         }
    //         // positionCursor()
    //     }

    //     const appendSelectList = (list: any) => {
    //         const cursor = window.getSelection();

    //         removeExistingLists()

    //         const selectList = createSelectList(list);

    //         const selectListParent = selectList.parentElement;

    //         selectList.className = "selectList"

    //         selectList.addEventListener("change", (e) => {
    //             removeExistingLists()
    //             transformToLink(e.target.textContent, e.target.value)
    //         })

    //         cursor?.focusNode.append(selectList)
    //         selectListParent?.setAttribute("style", "position: relative")
    //     }


    //     detectEntityType()
    //         .then((type) => {
    //             removeExistingLists()
    //             // positionCursor()
    //             retrieveTypeList(type)
    //                 .then((list) => {
    //                     appendSelectList(list)
    //                     // focusCurrentList()
    //                 })
    //                 .catch(() => removeExistingLists())
    //         });

    // }


    return {
        textAreaInputText,
        textAreaInput,
        handleKeyDown,
        handleKeyUp,
        isCap,
        focusTextAreaInput,

    }
}

const PostForm: React.FunctionComponent<PostFormComponent> = ({ title, categoryList, content, btnText, submitFunc, cancelFunc, includesCategoryPicker }) => {

    const [hasTitle, setHasTitle] = useState(false)
    const { handleKeyDown, handleKeyUp, textAreaInput, focusTextAreaInput, isCap } = useContentEditable();
    const handlePostSubmit = (e: any) => {
        e.preventDefault()

        if (hasTitle) {
            let data = {
                title: textAreaInput.current.firstElementChild.textContent,
                content: ""
            }

            textAreaInput.current.removeChild(textAreaInput.current.firstElementChild)

            data.content = textAreaInput.current.innerHTML

            submitFunc(data)
            cancelFunc();
        }
    }

    const checkHasTitle = () => {
        const titleElement = textAreaInput.current.firstElementChild

        if (titleElement.nodeName === "H1" && titleElement.textContent.length >= 1) {
            setHasTitle(true)
        } else {
            setHasTitle(false)
        }

    }

    return (
        <Body style={{ height: "100%" }}>
            {/* SHADOW OVERLAY */}
            <Shadow onClick={cancelFunc}></Shadow>
            {/* POST FORM */}
            <Form onSubmit={handlePostSubmit} >

                {/* EDIT BAR */}
                <EditBar isCap={isCap} focusTextBody={focusTextAreaInput} />

                {/* CONTENT INPUT */}
                <TextInputBody
                    id="textInputBody"

                >
                    <TextAreaInput
                        id="initialInputField"
                        dangerouslySetInnerHTML={{ __html: `<h1>${title}</h1>${content}` }}
                        ref={textAreaInput}
                        defaultValue={content}
                        onKeyDown={handleKeyDown}
                        onKeyUp={handleKeyUp} contentEditable="true" placeholder={"Post Content..."}
                        onInput={checkHasTitle}
                    >

                    </TextAreaInput>
                </TextInputBody>
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
                    <ConfirmBtn disabled={!hasTitle} type="submit" >{btnText}</ConfirmBtn>
                    <CancelBtn onClick={cancelFunc} >Cancle</CancelBtn>
                </ButtonContainer>
            </Form>

        </Body>
    )
}

export default PostForm;