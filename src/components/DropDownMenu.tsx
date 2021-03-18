/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: DropDownMenu.tsx
*/

import React, { FunctionComponent, useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
// import { useAuth0 } from "@auth0/auth0-react";
import useAuth from "../hooks/useAuth";
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

const Body = styled("div")`
    position: relative;
    height: 100%;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    svg {
        color: #f5f5f5;
        font-size: 2.1em;
        margin-right: 5px;
    }
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

interface DropDownMenuInterface {

}

const DropDownMenu: FunctionComponent<DropDownMenuInterface> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAdmin, user, isLoading } = useAuth();

    const toggleDropdown = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }

    return (
        <Body>
            {(user && !isLoading) && (
                isAdmin ?
                    <Icon onClick={toggleDropdown} icon={faUserTie} />
                    :
                    <Icon onClick={toggleDropdown} icon={faUser} />
            )}
            {/* Display dropdown menu and display shadow on open */}
            {isOpen && <Shadow onClick={toggleDropdown} />}
            {isOpen &&
                <List>
                    <ListItem><Link href="/api/auth/logout">Logout</Link></ListItem>
                    <ListItem><Link href="/user">Settings</Link></ListItem>
                </List>}
        </Body>

    )
}

export default DropDownMenu;