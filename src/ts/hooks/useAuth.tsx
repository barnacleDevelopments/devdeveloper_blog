/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: useNav.tsx
*/

// DEPENDENTCIES
import { useState, useEffect } from "react";

// CONTROLERS
import User from "../controllers/user_controllers";

export default () => {
    const [user, setUser] = useState({
        _id: "",
        username: "",
        status: false,
        role: ""
    });

    useEffect(() => {
        User.prototype.isAuthenticated()
            .then(data => setUser(data))
            .catch(err => console.log(err))
    }, [])

    return user;
}