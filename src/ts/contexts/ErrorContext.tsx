/*
AUTHOR: Devin Davis
DATE: January 31st, 2021
FILE: ErrorContext.tsx
*/

import { createContext } from "react";

interface ErrorContextData {
    currentError: string,
    addError(error: string): void

}

export const ErrorContextDefaultValue: ErrorContextData = {
    currentError: "",
    addError: () => null

}

export default createContext(ErrorContextDefaultValue);