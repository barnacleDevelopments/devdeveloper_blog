/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: index.tsx
*/

import * as React from "react";
import * as  ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

// COMPONENTS
import Container from "./ts/components/Container";
import Navbar from "./ts/components/Navbar";
import CategoriesView from "./ts/components/CategoriesView";
import PostsView from "./ts/components/PostsView";
import PostView from "./ts/components/PostView";
import CategoryEditView from "./ts/components/CategoryEditView";
import CategoryCreateView from "./ts/components/CategoryCreateView";
import PostEditView from "./ts/components/PostEditView";
import PostCreateView from "./ts/components/PostCreateView";

//GLOBAL STYLES
import "./css/reset.css";
import "./css/global.css";
// import "./img/logo.png";


//STYLES
const Body = styled("div")`

`

const App = () => {

    return (
        <Body>
            <Navbar />

            <Container>
                <Switch>
                    <Route exact path="/categories" component={CategoriesView} />
                    <Route path="/categories/create" component={CategoryCreateView} />
                    <Route path="/categories/edit/:id" component={CategoryEditView} />
                    <Route path="/categories/posts/:id" component={PostsView} />
                    <Route path="/posts/create/:id" component={PostCreateView} />
                    <Route path="/posts/edit/:id" component={PostEditView} />
                    <Route path="/posts/:id" component={PostView} />
                </Switch>
            </Container>
        </Body>
    );
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root"));