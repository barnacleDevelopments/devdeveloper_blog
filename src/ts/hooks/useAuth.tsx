/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: useNav.tsx
*/

import { useState, useEffect } from "react";

// CONTROLERS
import User from "../controllers/user_controllers";

export default () => {
    const [user, setUser] = useState({ status: false, role: "" });

    useEffect(() => {
        User.prototype.isAuthenticated()
            .then(data => setUser(data))
            .catch(err => console.log(err))
    }, [])

    return user;
}