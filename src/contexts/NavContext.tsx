/*
AUTHOR: Devin Davis
DATE: April 13st, 2021
FILE: NavContext.tsx
*/

import { createContext } from "react";

interface NavContextData {
    previousURL: string,
    updateNavParams(): void,
    backBtnStatus: boolean

}

export const NavContextDefaultValue: NavContextData = {
    previousURL: "",
    updateNavParams: () => null,
    backBtnStatus: false

}

export default createContext(NavContextDefaultValue);