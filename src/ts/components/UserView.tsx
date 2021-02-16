/*
AUTHOR: Devin Davis
DATE: Febuary 15th, 2021
FILE: UserView.tsx
*/

import React, { FunctionComponent, useContext, useState } from "react";
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";

// COMPONENTS 
import ConfirmForm from "./ConfirmForm";
import UserOption from "./UserOption";
import PasswordForm from "./PasswordForm";

// CONTEXTS
import { UserContext } from "../contexts/UserContext";

const Body = styled("section")`

`;

// INTERFACES
interface UserViewComponent {

}

const UserView: FunctionComponent<UserViewComponent> = () => {
    const { isAuthenticated, deleteAccount } = useContext(UserContext);
    const [deleteFormVisible, setDeleteFormVisibility] = useState<boolean>(false);
    const [passwordFormVisible, setPasswordFormVisibility] = useState<boolean>(false);

    const toggleDeleteForm = () => {
        deleteFormVisible ?
            setDeleteFormVisibility(false) : setDeleteFormVisibility(true)
    }

    const togglePasswordForm = () => {
        passwordFormVisible ?
            setPasswordFormVisibility(false) : setPasswordFormVisibility(true);
    }

    return (
        <Body>
            <UserOption name="Username..."
                btnContent="Change"
            />
            <UserOption name="Change Password"
                btnContent="Change"
                btnFunc={togglePasswordForm}
            />
            <UserOption name="Delete Account"
                btnContent="Delete"
                btnFunc={toggleDeleteForm}
            />

            {/* FORMS */}
            {deleteFormVisible ? <ConfirmForm
                confirmHandler={deleteAccount}
                cancelHandler={toggleDeleteForm}
                btnText="Delete Account"
                message="Are you sure you want to delete your account?"
            /> : null}

            {passwordFormVisible ? <PasswordForm cancelFunc={togglePasswordForm} /> : null}

            {/* REDIRECTS  */}
            {isAuthenticated ?
                null : <Redirect to="/categories" />}
        </Body>
    )
}

export default UserView;