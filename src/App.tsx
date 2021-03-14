/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: index.tsx
*/

import React from "react";
import * as  ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./ts/components/Auth0ProviderWIthHistory";

// COMPONENTS
import Container from "./ts/components/Container";
import Navbar from "./ts/components/Navbar";
import CategoriesView from "./ts/components/CategoriesView";
import PostsView from "./ts/components/PostsView";
import PostView from "./ts/components/PostView";
import ErrorNotification from "./ts/components/ErrorNotification";

// HOOKS
import useError from "./ts/hooks/useError";

// CONTEXTS
import ErrorContext from "./ts/contexts/ErrorContext";

//GLOBAL STYLES
import "./css/reset.css";
import "./css/global.css";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';




//STYLES
const Body = styled("div")`

`

const App = () => {

    const ErrorContextData = useError();

    return (
        <Body>
            <ErrorContext.Provider value={ErrorContextData}>

                <Navbar />
                <Container>
                    <Switch>
                        <Route exact path="/categories" >
                            <CategoriesView />
                        </Route>
                        <Route path="/categories/posts/:catId">
                            <PostsView />
                        </Route>
                        <Route exact path="/posts/:catId/:postId" >
                            <PostView />
                        </Route>
                    </Switch>
                </Container>
                {/* ERROR MESSAGES */}
                {ErrorContextData.currentError ? <ErrorNotification error={ErrorContextData.currentError} /> : null}

            </ErrorContext.Provider>
        </Body >
    );
}
ReactDOM.render(
    <Router>
        <Auth0ProviderWithHistory>
            <App />
        </Auth0ProviderWithHistory>
    </Router>,
    document.getElementById("root"));


export default App;