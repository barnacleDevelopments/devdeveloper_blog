/*
AUTHOR: Devin Davis
DATE: January 31st, 2021
FILE: useError.tsx
*/


import { useEffect, useState } from "react";


const useError = () => {
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [currentError, setCurrentError] = useState<string>("");


    useEffect(() => {
        errorMessages.forEach((err) => {
            console.log("set current error")
            setCurrentError(err);
            setTimeout(() => {
                console.log("clean current error")
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