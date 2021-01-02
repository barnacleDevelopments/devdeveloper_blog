/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Card.tsx
*/

import * as React from "react";
import {FunctionComponent} from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const CardBody = styled("div")`
    background-color: #314455;
    color: #f5f5f5;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 14px;
    box-shadow: 3px 3px 30px -20px black;
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


const Card = ({id, name, desc, img}) => {

 

    return (
        <CardBody>
            <CardImg src={img}/>
            <CardContent>
                <h2>{name}</h2>
                <p>{desc}</p>
                <Link to={`/blogs/${name}/${id}`} >VIEW</Link>
            </CardContent>
        </CardBody>
    )
}

export default Card