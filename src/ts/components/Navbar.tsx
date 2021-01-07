/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Navbar.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
// import logoImage from "../../img/logo_3.png";

// HOOKS
import useNav from "../hooks/useNav";

// background-image: url("${logoImage}");
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


interface NavComponent {
    user: { status: boolean, role: string }
}


const Navbar: React.FunctionComponent<NavComponent> = ({ user }) => {
    const { backBtnParams, backBtnStatus } = useNav();

    return (
        <Navbody>
            {backBtnStatus ? <Link to={backBtnParams}><BackBtn>
                <i className="fas fa-arrow-left fa-3x"></i>
            </BackBtn></Link> : <Logo />}

            <MediaLinks>
                <a href="https://www.linkedin.com/in/devin-dev-davis-63008412b"><i className="fab fa-linkedin fa-2x"></i></a>
                <a href="https://github.com/barnacleDevelopments"><i className="fab fa-github-alt fa-2x"></i></a>

                {user.status ? (
                    user.role === "administrator" ? <i className="fas fa-user-tie"></i> : <i className="fas fa-user"></i>
                )
                    : <Link to="/login"><i className="fas fa-sign-in-alt"></i></Link>}
            </MediaLinks>
        </Navbody>
    )
}

export default Navbar;