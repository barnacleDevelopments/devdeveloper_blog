/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Navbar.tsx
*/

import React, { useState } from "react";
import styled from "@emotion/styled";
import { Link, Redirect } from "react-router-dom";
import * as logoImage from "../../img/logo_3.png";

// HOOKS
import useNav from "../hooks/useNav";

// CONTROLLERS 
import User from "../controllers/user_controllers";

// INTERFACES
import { UserComponentData } from "../interfaces/user_interfaces";

interface NavComponent {
    user: UserComponentData
}

// COMPONENTS
import DropDownMenu from "../components/DropDownMenu";

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
    z-index: 10000
`;

const Logo = styled("div")`
    height: 40px;
    width: 40px;
    background-image: url("${logoImage.default}");
    background-repeat: no-repeat;
    background-size: 50px;
    background-position: center
`;

const BackBtn = styled("a")`
    i {
        color: #f5f5f5;
        font-size: 2.4em;
        margin-left: 5px;
    }
`;

const MediaLinks = styled("div")`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-right: 20px;
    text-decoration: none;
    i {
        color: #f5f5f5;
        font-size: 30px;
    }
`;

const Navbar: React.FunctionComponent<NavComponent> = ({ user }) => {
    const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false)
    const { backBtnParams, backBtnStatus } = useNav();


    const handleLogout = () => {
        User.prototype.logout()
            .then(() => {
                setIsLoggedOut(true)
                window.location.reload()
            })

    }

    return (
        <Navbody>
            {isLoggedOut ? <Redirect to="/" /> : null}
            {backBtnStatus ? <Link to={backBtnParams}><BackBtn>
                <i className="fas fa-arrow-left fa-3x"></i>
            </BackBtn></Link> : <Logo />}

            <MediaLinks>
                <a href="https://www.linkedin.com/in/devin-dev-davis-63008412b"><i className="fab fa-linkedin fa-2x"></i></a>
                <a href="https://github.com/barnacleDevelopments"><i className="fab fa-github-alt fa-2x"></i></a>

                {user.status ? <DropDownMenu user={user} menuItems={[
                    { name: "Loggout", link: "/", func: handleLogout },
                    { name: "Settings", link: "/" }
                ]} /> :
                    <Link to="/login"><i className="fas fa-sign-in-alt"></i></Link>}
            </MediaLinks>
        </Navbody>
    )
}

export default Navbar;