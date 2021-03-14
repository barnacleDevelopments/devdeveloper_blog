import React, { FunctionComponent } from "react";
import { useHistory } from "react-router";
import { Auth0Provider } from "@auth0/auth0-react";


const Auth0ProviderWithHistory: FunctionComponent = ({ children }) => {
    const domain = "dev-qkxpd7xc.auth0.com"
    const clientId = "D5z696nUHBC5BagT2te9xITn9JT8MOPR"
    const redirectURI = "http://localhost:5000/"
    const audience = 'http://localhost:5000/'

    const history = useHistory();

    const onRedirectCallback = (appState: any) => {
        history.push(appState?.returnTo || window.location.pathname);

    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={redirectURI}
            audience={audience}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;