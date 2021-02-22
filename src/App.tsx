/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: index.tsx
*/

import React from "react";
import * as  ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

// COMPONENTS
import Container from "./ts/components/Container";
import Navbar from "./ts/components/Navbar";
import CategoriesView from "./ts/components/CategoriesView";
import PostsView from "./ts/components/PostsView";
import PostView from "./ts/components/PostView";
import LoginView from "./ts/components/LoginView";
import SignupView from "./ts/components/SignupView";
import ErrorNotification from "./ts/components/ErrorNotification";

// HOOKS
import useError from "./ts/hooks/useError";
import useAuth from "./ts/hooks/useAuth";

// CONTEXTS
import { UserContext } from "./ts/contexts/UserContext";
import ErrorContext from "./ts/contexts/ErrorContext";

//GLOBAL STYLES
import "./css/reset.css";
import "./css/global.css";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import UserView from "./ts/components/UserView";

//STYLES
const Body = styled("div")`

`

const App = () => {
    const UserContextData = useAuth();
    const ErrorContextData = useError();
    return (
        <Body>
            <ErrorContext.Provider value={ErrorContextData}>
                <UserContext.Provider value={UserContextData}>
                    <Navbar />
                    <Container>
                        <Switch>
                            <Route exact path="/signup">
                                <SignupView />
                            </Route>
                            <Route exact path="/login" >
                                <LoginView />
                            </Route>
                            <Route exact path="/user">
                                <UserView />
                            </Route>
                            <Route exact path="/categories" >
                                <CategoriesView user={UserContextData.user} />
                            </Route>
                            <Route path="/categories/posts/:catId">
                                <PostsView user={UserContextData.user} />
                            </Route>
                            <Route exact path="/posts/:catId/:postId" >
                                <PostView />
                            </Route>
                        </Switch>
                    </Container>
                    {/* ERROR MESSAGES */}
                    {ErrorContextData.currentError ? <ErrorNotification error={ErrorContextData.currentError} /> : null}
                </UserContext.Provider>
            </ErrorContext.Provider>
        </Body>
    );
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root"));

export default App;