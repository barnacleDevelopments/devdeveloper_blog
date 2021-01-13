/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: DropDownMenu.tsx
*/

import React, { FunctionComponent, useState } from "react";
import styled from "@emotion/styled";

const Body = styled("div")`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
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
`;

const Shadow = styled("div")`
    background-color:rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
    position: fixed; 
    top: 0px;
    left: 0px;
`;

interface MenuItem {
    link: string,
    name: string,
    func?(): any
}

interface DropDownMenuInterface {
    menuItems: MenuItem[],
    user: UserComponentData
}

const DropDownMenu: FunctionComponent<DropDownMenuInterface> = ({ menuItems, user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
    }

    return (
        <Body>
            {isOpen ? <Shadow onClick={toggleDropdown} /> : null}
            {user.status ? (
                user.role === "administrator" ? <i onClick={toggleDropdown} className="fas fa-user-tie"></i> : <i onClick={toggleDropdown} className="fas fa-user"></i>
            ) : null}
            {isOpen ?
                <List>
                    {menuItems.map(item => {
                        return <ListItem onClick={item.func}><a>{item.name}</a></ListItem>
                    })}
                </List> : null}
        </Body>

    )
}

export default DropDownMenu;