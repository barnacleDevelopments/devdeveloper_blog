/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Navbar.tsx
*/

import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Link, Redirect } from "react-router-dom";
import * as logoImage from "../../img/logo_3.png";

// HOOKS
import useNav from "../hooks/useNav";

// INTERFACES
interface NavComponent {
    user: UserComponentData
}

// COMPONENTS
import DropDownMenu from "../components/DropDownMenu";

// CONTEXTS
import { UserContext } from "../contexts/UserContext";

const Navbody = styled("nav")`
    background-color: #314455;
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 3px 30px -20px black;
    z-index: 100000;
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

    // User Context
    const { logout, user } = useContext(UserContext);

    // logs the user out
    const handleLogout = () => {
        logout();
    }

    return (
        <Navbody>
            {user.status ? <Redirect to="/categories" /> : null}
            {backBtnStatus ? <Link to={backBtnParams}>
                <i className="fas fa-arrow-left fa-3x"></i>
            </Link> : <Logo />}

            {user.status ? <DropDownMenu user={user} menuItems={[
                { name: "Loggout", link: "/", func: handleLogout },
                { name: "Settings", link: "/" }
            ]} /> :
                <Link to="/login"><i className="fas fa-sign-in-alt"></i></Link>}
        </Navbody>
    )
}

export default Navbar;