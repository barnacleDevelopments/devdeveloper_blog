/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: useNav.tsx
*/

import { useState, useEffect } from "react";
import { useRouter } from "next/router";


const useNav = () => {
    const router = useRouter();
    const [backBtnStatus, setBackBtnStatus] = useState(false);
    const [previousURL, setPreviousURL] = useState<string>("");
    const [currentURL, setCurrentURL] = useState<string>("");

    useEffect(() => {
        updateNavParams()
    }, [router])

    const updateNavParams = () => {
        if (router.asPath === "/") {
            setBackBtnStatus(false)
        }

        if (router.pathname === "/posts/[catId]") {
            setPreviousURL("/");
            setCurrentURL(router.asPath)
            setBackBtnStatus(true)
        }

        if (router.pathname === "/posts/one/[postId]") {
            setPreviousURL(currentURL)
            setBackBtnStatus(true)
        }
    }

    return {
        previousURL,
        updateNavParams,
        backBtnStatus
    }
}

export default useNav;