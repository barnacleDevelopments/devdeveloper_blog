/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: index.tsx
*/

import * as React from "react";
import { useState, useEffect } from "react";
import * as  ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { Switch, Route, useParams, useLocation, BrowserRouter as Router } from "react-router-dom";

// COMPONENTS
import Container from "./ts/components/Container";
import Navbar from "./ts/components/Navbar";
import CategoriesView from "./ts/components/CategoriesView";
import BlogsView from "./ts/components/BlogsView";
import BlogView from "./ts/components/BlogView";
//GLOBAL STYLES
import "./css/reset.css";
import "./css/global.css";
import "./img/logo.png"


//STYLES
const Body = styled("div")`

`

const App = () => {
    const [backBtnStatus, setBackBtnStatus] = useState(false);
    const location = useLocation()
    
    const checkBackBtn = () => {
        if(location.pathname === "/categories") {
            setBackBtnStatus(false)
        } else {
            setBackBtnStatus(true)
        }
    }

    useEffect(() => {
        checkBackBtn()
    }, [location])

    return (
        <Body>
            <Navbar backBtnStatus={backBtnStatus} />
            <Container>
            
                <Switch>
                    <Route path="/categories">
                        <CategoriesView />
                    </Route>
                    <Route path="/blogs/:title/:id">
                        <BlogsView />
                    </Route>
                    <Route path="/blog/:id">
                        <BlogView />
                    </Route>
                </Switch>
            </Container>
        </Body>
    );
}

ReactDOM.render(<Router><App/></Router>, document.getElementById("root"));