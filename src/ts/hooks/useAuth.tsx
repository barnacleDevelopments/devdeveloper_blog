/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: useNav.tsx
*/

// DEPENDENTCIES
import { useState } from "react";

// CONTROLERS
import User from "../controllers/user_controllers";

export default () => {
    const [isError, setIsError] = useState<boolean>(false);
    const [userErrorMessage, setUserErrorMessage] = useState<string>("")
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserComponentData>({
        _id: "",
        username: "",
        role: ""
    });

    const auth = () => {
        User.prototype.isAuthenticated()
            .then(data => {
                setUser(data);
                setIsAuthenticated(true);
            })
    }



    const login = (username: string, password: string) => {
        User.prototype.login(username, password)
            .then(data => {
                if (data.status === "error") {
                    setIsError(true);
                } else {
                    setIsError(false);
                    setIsAuthenticated(true);
                    data.data ? setUser(data.data) : null
                }
            })
    }

    const signup = (username: string, password: string) => {
        User.prototype.signup(username, password)
            .then(data => {
                if (data.status === "error") {
                    setIsError(true);
                    data.message ? setUserErrorMessage(data.message) : null
                } else {
                    setIsAuthenticated(true);
                }
            })
    }

    const logout = () => {
        User.prototype.logout()
            .then(data => {
                if (data.status === "success") {
                    setIsAuthenticated(false);
                    setUser({
                        _id: "",
                        username: "",
                        role: "",
                    });
                }
                if (data.status === "error" && data.message !== undefined) {
                    setIsError(true);
                }
            })
    }



    return {
        user,
        auth,
        isAuthenticated,
        logout,
        login,
        isError,
        setIsError,
        setUserErrorMessage,
        userErrorMessage,
        signup
    };
}