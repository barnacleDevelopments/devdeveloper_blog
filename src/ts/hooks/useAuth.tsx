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
    const [user, setUser] = useState<UserComponentData>({
        _id: "",
        username: "",
        status: false,
        role: ""
    });
    const [errMessage, setErrMessage] = useState<String>("");

    const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

    const auth = () => {
        User.prototype.isAuthenticated()
            .then(data => {
                setIsAuthenticated(true);
                setUser(data);
            })
    }

    const login = (username: string, password: string) => {
        User.prototype.login(username, password)
            .then(data => {
                console.log(data.message)
                if (data.status === "success") {
                    auth();
                }
                if (data.status === "failure") {
                    setErrMessage(errMessage);
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
                        status: false,
                        role: "",
                    });
                }
                if (data.status === "failure") {
                    setErrMessage(errMessage);
                }
            })
    }

    return {
        user,
        auth,
        isAuthenticated,
        logout,
        login,
        errMessage
    };
}