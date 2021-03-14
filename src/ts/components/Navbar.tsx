/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Navbar.tsx
*/

import React from "react";
import styled from "@emotion/styled";
import { Link, Redirect } from "react-router-dom";
import * as logoImage from "../../img/logo_3.png";

// HOOKS
import useNav from "../hooks/useNav";

// INTERFACES
interface NavComponent {

}

// COMPONENTS
import DropDownMenu from "../components/DropDownMenu";
import useAuth from "../hooks/useAuth";


const Navbody = styled("nav")`
    background-color: #314455;
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    box-shadow: 1px 1px 5px 0px #00000040;
    z-index: 997;
    align-items: center;
    a {
        i {
            color: #f5f5f5;
            font-size: 2.1em;
            margin-right: 5px;
        } 
    }
`;

const Logo = styled("div")`
    height: 40px;
    width: 40px;
    background-image: url("${logoImage.default}");
    background-repeat: no-repeat;
    background-size: 50px;
    background-position: center;
`;


const Navbar: React.FunctionComponent<NavComponent> = () => {
    const { backBtnParams, backBtnStatus } = useNav();
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth();



    return (
        <Navbody>
            {isAuthenticated ? <Redirect to="/categories" /> : null}
            {backBtnStatus ? <Link to={backBtnParams}>
                <i className="fas fa-arrow-left fa-3x"></i>
            </Link> : <Logo />}

            {isAuthenticated && !isLoading ? <DropDownMenu /> :
                <a onClick={() => loginWithRedirect()}><i className="fas fa-sign-in-alt"></i></a>}
        </Navbody>
    )
}

export default Navbar;