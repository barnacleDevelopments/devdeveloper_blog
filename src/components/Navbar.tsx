/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Navbar.tsx
*/

import React, { useContext } from "react";
import styled from "@emotion/styled";

// FONT AWESOME 
import { faArrowLeft, faSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

// COMPONENTS
import DropDownMenu from "./DropDownMenu";
import useAuth from "../hooks/useAuth";

// CONTEXTS
import NavContext from "../contexts/NavContext";
import { useRouter } from "next/router";

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
        width: 1em;
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
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const { backBtnStatus } = useContext(NavContext);
    return (
        <Navbody>
            {backBtnStatus && (
                <Icon onClick={router.back} icon={faArrowLeft} />
            )}

            <Logo src="../img/logo_3.png" />

            {user && !isLoading ?
                <DropDownMenu /> :
                <a href="/api/auth/login">
                    <Icon icon={faSign}></Icon>
                </a>}
        </Navbody>
    )
}

export default Navbar;