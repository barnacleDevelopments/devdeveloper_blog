/*
AUTHOR: Devin Davis
DATE: March 13th, 2021
FILE: useNav.tsx
*/

// DEPENDENTCIES
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const useAuth = () => {
    const [userMetadata, setUserMetadata] = useState(null);
    const { user, getAccessTokenSilently, isAuthenticated, isLoading, error, logout, loginWithRedirect } = useAuth0();
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            try {

                const token = await getAccessTokenSilently();


                const userDetailsByIdUrl = `https://dev-qkxpd7xc.auth0.com/userinfo`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                metadataResponse.json()
                    .then(data => {
                        if (data["https://dev-qkxpd7xc:auth0:com/user_metadata"].role === "administrator") {
                            setIsAdmin(true)
                        } else {
                            setIsAdmin(false)
                        }
                    })
            } catch (e) {
                console.error(e);
                console.log(error)
            }
        })();
    }, [getAccessTokenSilently]);

    return {
        userMetadata,
        setUserMetadata,
        isAuthenticated,
        user,
        isLoading,
        isAdmin,
        logout,
        loginWithRedirect,
        getAccessTokenSilently

    }

}

export default useAuth;