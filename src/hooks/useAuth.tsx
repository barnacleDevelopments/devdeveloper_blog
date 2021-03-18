/*
AUTHOR: Devin Davis
DATE: March 13th, 2021
FILE: useNav.tsx
*/

// DEPENDENTCIES
import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

const useAuth = () => {
    // auth0 hook
    const { user, isLoading } = useUser();
    // is admin state
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    // retrive 
    useEffect(() => {
        if ((user !== undefined) && !isLoading) {
            if ((user["http://reallyuniquenamespace.com/roles"][0] === "administrator")) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        }
    }, [])

    return {
        user,
        isLoading,
        isAdmin

    }
}

export default useAuth;