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
import Category from "../controllers/category_controller";
import { useState } from "react";


const CardBody = styled("div")`
    background-color: #314455;
    color: #f5f5f5;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 14px;
    box-shadow: 3px 3px 30px -20px black;
    position: relative;
    > a:nth-of-type(1) {
        position: absolute;
        right: -10px;
        top: -10px;
        background-color: #97aabd; 
        padding: 6px;
        border-radius: 30px;
        color: #f5f5f5;
    }

    > a:nth-of-type(2) {
        position: absolute;
        right: -10px;
        top: 30px;
        background-color: #97aabd; 
        padding: 6px;
        border-radius: 30px;
        color: #f5f5f5;
    }
`;

const CardImg = styled("img")`
    width: 100%;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

const CardContent = styled("div")`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 15px;
    h2 {
        font-size: 2em;
        grid-column: 1 / span 2 ;
        margin-bottom: 5px;
        text-transform: capitalize;
    }

    p {
        grid-column: 1;
        font-size: 16px;
        text-align: left;
        font-weight: 100;
        line-height: 1.5;
    }

    a {
        background-color: #9E5A63;
        border-radius: 4px;
        padding: 6px 20px;
        box-shadow: 
        display: inline-block;
        grid-column: 2;
        text-align: center;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: #f5f5f5;
        box-shadow: 3px 3px 30px -10px black;
    }
`;

const CardCount = styled("div")`
    background-color: #9E5A63;
    font-size: 2em;
    color: #f5f5f5;
    padding-top: 3px;
    width: 40px;
    height: 40px;
    position: absolute;
    bottom: 130px;
    right: 10px;
    border-radius: 30px;
    text-align: center;
    vertical-align: middle;
    display: table-cell;
`;

interface CategoryComponentData {
    id: string,
    name: string,
    desc: string,
    count: number,
    img: string,
    user: { role: string, status: boolean }
}


const Card: React.FunctionComponent<CategoryComponentData> = ({ user, id, name, desc, count, img }) => {
    const [isDeleted, setIsDeleted] = useState(false);


    const handleDelete = () => {
        setIsDeleted(true);
        Category.prototype.delete(id);
    }

    if (!isDeleted) {
        return (
            <CardBody>
                <CardImg src={img} />
                <CardCount>{count}</CardCount>
                <CardContent>
                    <h2>{name}</h2>
                    <p>{desc}</p>
                    <Link to={`/categories/posts/${id}`}>VIEW</Link>
                </CardContent>

                {user.role === "administrator" ?
                    <Link to={`/categories/edit/${id}`}><i className="fas fa-pen fa-1x"></i></Link> : null}

                {user.role === "administrator" ?
                    <Link onClick={handleDelete} to={`/categories`}><i className="far fa-trash-alt"></i></Link> : null}
            </CardBody>
        )
    } else {
        return null;
    }
}

export default Card;