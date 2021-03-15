/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: useNav.tsx
*/

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default () => {
    const location = useLocation();
    const [backBtnStatus, setBackBtnStatus] = useState(false);
    const [backBtnParams, setBackBtnParams] = useState("/categories");

    useEffect(() => {
        if (location.pathname !== "/categories") {
            setBackBtnStatus(true);
        } else {
            setBackBtnStatus(false);
        }
    }, [location]);

    const checkBackBtn = () => {
        if (location.pathname === "/categories/:title") {
            setBackBtnParams(location.pathname)
        }
    }

    useEffect(() => {
        checkBackBtn()
    }, [location])

    return {
        backBtnStatus,
        backBtnParams
    }
}