/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: DropDownMenu.tsx
*/

import React, { FunctionComponent, useState } from "react";
import styled from "@emotion/styled";

// INTERFACES
import { UserComponentData } from "../interfaces/user_interfaces";

const Body = styled("div")`
    position: relative;
`;

const List = styled("ul")`
    display: flex;
    position: absolute;
    flex-direction: column;
    background-color: #f5f5f5;
    border-radius: 4px;
    right: -1px;
    top: -1px;
`;

const ListItem = styled("li")`
    padding: 10px;
    :nth-of-type(1) {
        border-bottom: 1px solid black;
    }
`;

interface MenuItem {
    link: string,
    name: string
}

interface DropDownMenuInterface {
    menuItems: MenuItem[],
    user: UserComponentData
}

const DropDownMenu: FunctionComponent<DropDownMenuInterface> = ({ menuItems, user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true)
    }

    return (
        <Body>
            {user.status ? (
                user.role === "administrator" ? <i onClick={toggleDropdown} className="fas fa-user-tie"></i> : <i onClick={toggleDropdown} className="fas fa-user"></i>
            ) : null}
            {isOpen ?
                <List>
                    {menuItems.map(item => {
                        return <ListItem><a>{item.name}</a></ListItem>
                    })}
                </List> : null}
        </Body>

    )
}

export default DropDownMenu;