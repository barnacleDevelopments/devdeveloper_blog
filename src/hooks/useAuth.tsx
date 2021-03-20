/*
AUTHOR: Devin Davis
DATE: March 13th, 2021
FILE: useNav.tsx
*/

// DEPENDENTCIES
import { useEffect, useState } from "react";
import { UserContext, useUser } from "@auth0/nextjs-auth0";
import { CustomUserContext } from "../customTypings/user_interfaces";

const useAuth = () => {
    // auth0 hook
    const User: UserContext = useUser();
    let CustomUser: CustomUserContext = (User as CustomUserContext)
    const [isAdmin, setIsAdmin] = useState(false);
    // retrive 
    useEffect(() => {
        if ((CustomUser.user !== undefined) && !CustomUser.isLoading) {
            if (CustomUser.user["http://reallyuniquenamespace.com/roles"][0] === "administrator") {
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
            }
        }
    }, [CustomUser.user, CustomUser.isLoading])

    return { isAdmin, ...CustomUser };
}

export default useAuth;