/*
AUTHOR: Devin Davis
DATE: January 31st, 2021
FILE: useError.tsx
*/

import { useEffect, useState } from "react";

/**
 * @description Holds current state error list.
 * @returns Current error and add error function.
 */
const useError = () => {
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [currentError, setCurrentError] = useState<string>("");

    useEffect(() => {
        errorMessages.forEach((err) => {
            setCurrentError(err);
            setTimeout(() => {
                setCurrentError("")
            }, 5000)
        })
    }, [errorMessages])

    const addError = (error: string) => {
        let newErrorList: string[] = errorMessages;
        newErrorList = [...newErrorList, error]
        setErrorMessages(newErrorList)
    }

    return {
        addError,
        currentError
    }

}

export default useError;