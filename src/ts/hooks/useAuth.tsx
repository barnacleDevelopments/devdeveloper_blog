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
    const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

    const auth = () => {
        User.prototype.isAuthenticated()
            .then(data => {
                setIsAuthenticated(true);
                setUser(data);
            })
            .catch(err => {
                setIsAuthenticated(false);
                console.log(err);
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
            }).catch(() => setIsAuthenticated(true))
    }

    return {
        user,
        auth,
        isAuthenticated,
        logout
    };
}