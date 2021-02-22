/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: DropDownMenu.tsx
*/

import React, { FunctionComponent, useContext, useState } from "react";
import styled from "@emotion/styled";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

const Body = styled("div")`
    position: relative;
    height: 100%;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const List = styled("ul")`
    display: flex;
    position: absolute;
    flex-direction: column;
    background-color: #97aabd;
    border-radius: 4px;
    right: -1px;
    top: -1px;
    color: #f5f5f5;
`;

const ListItem = styled("li")`
    padding: 10px;
    :nth-of-type(1) {
        border-bottom: 1px solid #f5f5f5;
    }
    a {
        text-decoration: none;
        color: #f5f5f5;
    }
`;

const Shadow = styled("div")`
    background-color:rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
    position: fixed; 
    top: 0px;
    left: 0px;

`;

const UserLogo = styled("i")`
    color: #f5f5f5;
    font-size: 2.1em;
    margin-right: 5px;
`;


interface DropDownMenuInterface {

}

const DropDownMenu: FunctionComponent<DropDownMenuInterface> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user, logout } = useContext(UserContext)

    const toggleDropdown = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }

    return (
        <Body>
            {isAuthenticated ? (
                user.role === "administrator" ?
                    <UserLogo onClick={toggleDropdown} className="fas fa-user-tie" />
                    :
                    <UserLogo onClick={toggleDropdown} className="fas fa-user" />
            ) : null}
            {/* Display dropdown menu and display shadow on open */}
            {isOpen ? <Shadow onClick={toggleDropdown} /> : null}
            {isOpen ?
                <List>
                    <ListItem onClick={() => logout()}><Link to={"/"}>Logout</Link></ListItem>
                    <ListItem><Link to="/user">Settings</Link></ListItem>
                </List> : null}
        </Body>

    )
}

export default DropDownMenu;