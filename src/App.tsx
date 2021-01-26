/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: index.tsx
*/

import React from "react";
import * as  ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";

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
import LoginView from "./ts/components/LoginView";
import SignupView from "./ts/components/SignupView";

// CONTEXTS
import { UserContext } from "./ts/contexts/UserContext";

//GLOBAL STYLES
import "./css/reset.css";
import "./css/global.css";
import useAuth from "./ts/hooks/useAuth";


// import "./img/logo.png";


//STYLES
const Body = styled("div")`

`

const App = () => {
    const UserContextData = useAuth();

    return (
        <Body>
            {UserContextData.isAuthenticated ? null : <Redirect to="/categories" />}
            <UserContext.Provider value={UserContextData}>
                <Navbar user={UserContextData.user} />
                <Container>
                    <Switch>
                        <Route exact path="/signup">
                            <SignupView user={UserContextData.user} />
                        </Route>
                        <Route exact path="/login" >
                            <LoginView user={UserContextData.user} />
                        </Route>
                        <Route exact path="/categories" >
                            <CategoriesView user={UserContextData.user} />
                        </Route>
                        <Route path="/categories/create">
                            <CategoryCreateView user={UserContextData.user} />
                        </Route>
                        <Route path="/categories/edit/:catId">
                            <CategoryEditView user={UserContextData.user} />
                        </Route>
                        <Route path="/categories/posts/:catId">
                            <PostsView user={UserContextData.user} />
                        </Route>
                        <Route exact path="/posts/edit/:catId/:postId">
                            <PostEditView user={UserContextData.user} />
                        </Route>
                        <Route path="/posts/create/:catId">
                            <PostCreateView user={UserContextData.user} />
                        </Route>
                        <Route exact path="/posts/:catId/:postId" >
                            <PostView user={UserContextData.user} />
                        </Route>
                    </Switch>
                </Container>
            </UserContext.Provider>
        </Body>
    );
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root"));

export default App;