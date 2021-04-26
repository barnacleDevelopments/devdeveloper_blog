/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: CreateBtn.tsx
*/

import React, { useState } from "react";
import styled from "@emotion/styled";

// FONT AWESOME 
import { faFile, faFolder, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

const Body = styled("div")`
    position: fixed;
    bottom: 20px;
    right: 20px;
    height: 70px;
    width: 70px;
    z-index: 996;
`;
const Button = styled("a")`
    position: absolute;
    background-color: #97aabd;
    padding: 20px;
    color: #f5f5f5;
    border-radius: 50px;
    box-shadow: 1px 1px 5px 0px #00000040;
    height: 70px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 996;
    svg {
        color: #f5f5f5;
        font-size: 2.1em;
    }
`;

const TopDrawerButton = styled("div")`
    position: absolute;
    z-index:1;
    background-color: #97aabd;
    width: 70px;
    display: flex;
    justify-content: center;
    border-radius: 40px;
    box-shadow: 1px 1px 5px 0px #00000040;
    transition: height .5s, opacity .3s;
    z-index: 995;
    p {
        position: absolute;
        left: 2px;
        top: 30px;
        font-weight: bold;
        opacity: 0;
        transition: opacity .2s;
        color: #314455;
        font-size: 14px;
    }

    p:hover {
        opacity: 1;
    }

    svg {
        width: 1.8em;
        color: #f5f5f5;
        margin-top: 25px;

    }
`;

const WestDrawerButton = styled("div")`
    position: absolute;
    display: flex;
    justify-content: flex-start;
    height: 70px;
    background-color: #97aabd;
    display: flex;
    justify-content: left;
    align-items: center;
    border-radius: 40px;
    box-shadow: 1px 1px 5px 0px #00000040;
    transition: width .5s, opacity .3s;
    z-index: 995;
    p {
        position: absolute;
        left: 20px;
        top: 26.5px;
        font-weight: bold;
        opacity: 0;
        transition: opacity .2s;
        color: #314455;
        font-size: 14px;
    }

    p:hover {
        opacity: 1;
    }
    svg {
        width: 2em;
        height: 2em;
        padding: 10px;
        margin-left: 10px;
        color: #f5f5f5;
    }
`;

interface CreateBtnData {
    isDesktop: boolean,
    toggleCategoryCreateForm?(): void,
    togglePostCreateForm?(): void
}

const CreateBtn: React.FunctionComponent<CreateBtnData> = ({ isDesktop, toggleCategoryCreateForm, togglePostCreateForm }) => {

    const [drawerStatus, setDrawerStatus] = useState<boolean>(false);

    const [TopDrawerStyle, setTopDrawerStyle] = useState({
        bottom: "10px",
        height: "34px",
        opacity: 0,
    });

    const [WestDrawerStyle, setWestDrawerStyle] = useState({
        right: "10px",
        width: "34px",
        opacity: 0,
    });

    const toggleCreateBtnDrawers = () => {
        if (drawerStatus) {
            setDrawerStatus(false);
            setTopDrawerStyle({
                bottom: "10px",
                height: "34px",
                opacity: 0,
            })
            setWestDrawerStyle({
                right: "10px",
                width: "34px",
                opacity: 0,
            })

        } else {
            setDrawerStatus(true);
            setTopDrawerStyle({
                bottom: "10px",
                height: "130px",
                opacity: 1,
            })
            setWestDrawerStyle({
                right: "10px",
                width: "130px",
                opacity: 1,
            })
        }
    }

    if (isDesktop) {
        return (
            <Body>
                <TopDrawerButton onClick={toggleCategoryCreateForm} style={TopDrawerStyle}>
                    <div><p>Category</p><Icon icon={faFolder} /></div>
                </TopDrawerButton>
                <Button onClick={toggleCreateBtnDrawers}>
                    <Icon icon={faPlus} />
                </Button>
                <WestDrawerButton onClick={togglePostCreateForm} style={WestDrawerStyle}>
                    <div><p>Post</p><Icon icon={faFile} /></div>
                </WestDrawerButton>
            </Body>
        )
    } else {
        return (
            <Body>
                <Button onClick={togglePostCreateForm || toggleCategoryCreateForm}>
                    <Icon icon={faPlus} />
                </Button>
            </Body>
        )
    }
}

export default CreateBtn;