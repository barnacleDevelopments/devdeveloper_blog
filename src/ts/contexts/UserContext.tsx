import { createContext } from "react";

interface UserComponentData {
    _id: string,
    username: string,
    role: string
}

interface UserContextData {
    user: UserComponentData,
    isError: boolean,
    isAuthenticated: Boolean,
    userErrorMessage: string,
    setUserErrorMessage(message: string): void;
    setIsError(status: boolean): void,
    auth: () => void,
    logout: () => void,
    login: (username: string, password: string) => void,
    signup: (username: string, password: string) => void

}

export const UserContextDefaultValue: UserContextData = {
    user: {
        _id: "",
        username: "",
        role: ""
    },
    isAuthenticated: false,
    isError: false,
    userErrorMessage: "",
    setUserErrorMessage: () => null,
    setIsError: () => null,
    auth: () => null,
    logout: () => null,
    login: () => null,
    signup: () => null

}

export const UserContext = createContext(UserContextDefaultValue);

