/*
AUTHOR: Devin Davis
DATE: April 6th, 2021
FILE: Snip.tsx
*/

import styled from "@emotion/styled";
import { FunctionComponent, useState } from "react";
import useAuth from "../../hooks/useAuth";

// FONT AWESOME 
import { faPen, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

// COMPONENTS 
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import ConfirmForm from "../ConfirmForm";
import CategoryForm from "../CategoryForm";

const Body = styled("li")`
    width: fit-content;
    padding: 13px;
    border-radius: 20px;
    color: #f5f5f5;
    font-weight: bold;
    box-shadow: 1px 1px 5px 0px #00000030;
    display: inline-block;
    margin-right: 10px;
    margin-top: 10px;
    text-transform: capitalize;
    
    text-align: center;
    svg {
        margin-left: 10px;
        width: 1em;
    }
`;

interface BiscuitData {
    catId: string,
    textContent: string,
    addActiveCategory(catId: string): void,
    removeActiveCategory(catId: string): void,
    catDescription: string,
    deleteCategory(catId: string): void,
    updateCategory(catId: string, name: string, desc: string): void
}

const Biscuit: FunctionComponent<BiscuitData> = ({ catId, textContent, catDescription, addActiveCategory, removeActiveCategory, updateCategory, deleteCategory }) => {
    // state of biscuit 
    const [isActive, setIsActive] = useState(false);
    // state syle of biscuit
    const [currentStyle, setCurrentStyle] = useState({ backgroundColor: "#9E5A63" })
    // delete form visibility state
    const [deleteFormVisible, setDeleteFormVisible] = useState<boolean>(false);
    // edit form visibility state 
    const [editFormVisible, setEditFormVisible] = useState<Boolean>(false);
    // current authenticated user
    const { isLoading, user, isAdmin } = useAuth();

    const toggleDeleteForm = () => {
        deleteFormVisible ?
            setDeleteFormVisible(false) : setDeleteFormVisible(true);
    }

    const toggleEditForm = () => {
        editFormVisible ? setEditFormVisible(false) : setEditFormVisible(true)
    }

    const toggleActiveState = () => {
        if (isActive) {
            setIsActive(false)
            setCurrentStyle({ backgroundColor: "#9E5A63" })
            removeActiveCategory(catId)
        } else {
            setIsActive(true);
            setCurrentStyle({ backgroundColor: "#97AABD" })
            addActiveCategory(catId)
        }
    }

    return (
        (isAdmin && !isLoading && user) ?
            <Body
                onClick={toggleActiveState}
                style={currentStyle}>
                {textContent}
                <Icon icon={faPen} onClick={toggleEditForm} />
                <Icon icon={faTimesCircle} onClick={toggleDeleteForm} />

                {/* DELETE FORM */}
                {deleteFormVisible &&
                    <ConfirmForm
                        cancelHandler={toggleDeleteForm}
                        confirmHandler={() => {
                            deleteCategory(catId);
                            toggleDeleteForm();
                        }}
                        btnText="Confirm"
                        message="You sure you want to delete this category?" />}

                {/* EDIT FORM */}
                {editFormVisible &&
                    <CategoryForm
                        cancelFunc={toggleEditForm}
                        submitFunc={(data: CategoryFormData) => {
                            updateCategory(catId, data.name, data.desc)
                            toggleEditForm();
                        }}
                        btnText="Confirm"
                        name={textContent}
                        desc={catDescription}
                    />}

            </Body>
            :
            <Body onClick={toggleActiveState} style={currentStyle}>{textContent}</Body>
    );
}

export default Biscuit;