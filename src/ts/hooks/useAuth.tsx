/*
AUTHOR: Devin Davis
DATE: March 13th, 2021
FILE: useNav.tsx
*/

// DEPENDENTCIES
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const useAuth = () => {
    // auth0 hook
    const { user, getAccessTokenSilently, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();
    // is admin state
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    // retrive 
    useEffect(() => {
        if (isAuthenticated && (user["http://reallyuniquenamespace.com/roles"][0] === "administrator")) {
            setIsAdmin(true)
        } else {
            setIsAdmin(false)
        }
    }, [])


    console.log(user)

    return {
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