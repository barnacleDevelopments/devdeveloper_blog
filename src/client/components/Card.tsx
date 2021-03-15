/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Card.tsx
*/

// DEPENDENCIES
import * as React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

// CONTROLLERS
import { useState } from "react";

// ASSETS 
import CardPhoto from "../img/logo.png"
import ConfirmForm from "./ConfirmForm";
import CategoryForm from "./CategoryForm";

// INTERFACES
interface CategoryComponentData {
    catId: string,
    name: string,
    desc: string,
    count: number,
    img?: string,
    isAdmin: boolean,
    deleteCategory(catId: string): void,
    updateCategory(catId: string, name: string, desc: string): void
}

// STATELESS COMPONENTS
import { CardBtn, EditBtn, DeleteBtn } from "../stateless_components/buttons";


const CardBody = styled("div")`
    background-color: #314455;
    color: #f5f5f5;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 14px;
    box-shadow: 3px 3px 30px -20px black;
    position: relative;
    min-width: 270px;
`;

const CardImg = styled("img")`
    width: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

const CardContent = styled("div")`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 15px 17px;
    column-gap: 15px;

    div {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }

    h2 {
        font-size: 2em;
        grid-column: 1 / span 2;
        text-transform: capitalize;
        margin-bottom: 9.5px;
        margin-top: 5px;
    }

    p {
        grid-column: 1;
        font-size: 16px;
        text-align: left;
        font-weight: 100;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const CardCount = styled("div")`
    background-color: #9E5A63;
    font-size: 2em;
    color: #f5f5f5;
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 137px;
    right: 12px;
    border-radius: 30px;
    text-align: center;
    vertical-align: middle;
    display: flex;
    justify-content: center;
    align-items: center;

`;

const Card: React.FunctionComponent<CategoryComponentData> = ({ isAdmin, catId, name, desc, count, deleteCategory, updateCategory }) => {
    const [deleteFormVisible, setDeleteFormVisible] = useState<boolean>(false);
    const [editFormVisible, setEditFormVisible] = useState<Boolean>(false);

    const toggleDeleteForm = () => {
        deleteFormVisible ?
            setDeleteFormVisible(false) : setDeleteFormVisible(true);
    }

    const toggleEditForm = () => {
        editFormVisible ? setEditFormVisible(false) : setEditFormVisible(true)
    }

    return (
        <CardBody>
            <CardImg src={CardPhoto} />
            <CardCount>{count}</CardCount>
            <CardContent>
                <h2>{name ? name : "No Name"}</h2>
                {<p>{desc ? desc : "This category has no description."}</p>}
                <div>
                    <CardBtn><Link to={`/categories/posts/${catId}`}>View</Link></CardBtn>
                </div>
            </CardContent>

            {/* DELETE FORM */}
            {deleteFormVisible ?
                <ConfirmForm
                    cancelHandler={toggleDeleteForm}
                    confirmHandler={() => {
                        deleteCategory(catId);
                        toggleDeleteForm();
                    }}
                    btnText="Confirm"
                    message="You sure you want to delete this thing?" /> : null}

            {/* EDIT FORM */}
            {editFormVisible ?
                <CategoryForm
                    cancelFunc={toggleEditForm}
                    submitFunc={(data: CategoryFormData) => {
                        updateCategory(catId, data.name, data.desc)
                        toggleEditForm();
                    }}
                    btnText="Confirm"
                    name={name}
                    desc={desc}
                /> : null}

            {/* EDIT BUTTON */}
            {isAdmin ?
                <EditBtn onClick={toggleEditForm}><i className="fas fa-pen fa-1x"></i></EditBtn> : null}

            {/* DELETE BUTTON */}
            {isAdmin ?
                <DeleteBtn onClick={toggleDeleteForm} ><i className="far fa-trash-alt"></i></DeleteBtn> : null}
        </CardBody>
    )
}

export default Card;