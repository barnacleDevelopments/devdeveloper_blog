/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: useNav.tsx
*/

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default () => {
    const router = useRouter();
    const [backBtnStatus, setBackBtnStatus] = useState(false);
    const [backBtnParams, setBackBtnParams] = useState("/");

    useEffect(() => {
        if (router.pathname !== "/") {
            setBackBtnStatus(true);
        } else {
            setBackBtnStatus(false);
        }
    }, [router]);

    const checkBackBtn = () => {
        if (router.pathname === "/categories/:title") {
            setBackBtnParams(router.pathname)
        }
    }

    useEffect(() => {
        checkBackBtn()
    }, [router])

    return {
        backBtnStatus,
        backBtnParams
    }
}