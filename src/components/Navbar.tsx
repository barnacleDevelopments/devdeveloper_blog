/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Navbar.tsx
*/

import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

// FONT AWESOME 
import { faArrowLeft, faSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'


// HOOKS
import useNav from "../hooks/useNav";

// COMPONENTS
import DropDownMenu from "./DropDownMenu";
import useAuth from "../hooks/useAuth";


const Navbody = styled("nav")`
    background-color: #314455;
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0px;
    left: 0px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    box-shadow: 1px 1px 5px 0px #00000040;
    z-index: 997;
    align-items: center;

    svg {
        color: #f5f5f5;
        font-size: 2.1em;
        margin-right: 5px;
    }
`;

const Logo = styled("img")`
    height: 55px;
    width: 55px;
    background-repeat: no-repeat;
    background-size: 50px;
    background-position: center;
`;

const Navbar: React.FunctionComponent = () => {
    const { backBtnParams, backBtnStatus } = useNav();
    const { user, isLoading, } = useAuth();

    return (
        <Navbody>
            {backBtnStatus ? <Link href={backBtnParams}>
                <Icon icon={faArrowLeft} />
            </Link> : <Logo src="../img/logo_3.png" />}

            {user && !isLoading ?
                <DropDownMenu /> :
                <a href="/api/auth/login">
                    <Icon icon={faSign}></Icon>
                </a>}
        </Navbody>
    )
}

export default Navbar;