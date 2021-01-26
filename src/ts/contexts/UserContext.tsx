import { createContext } from "react";

interface UserComponentData {
    _id: string,
    username: string,
    status: boolean,
    role: string
}


interface UserContextData {
    user: UserComponentData,
    auth: () => void,
    isAuthenticated: Boolean,
    logout: () => void
}


export const UserContextDefaultValue: UserContextData = {
    user: {
        _id: "",
        username: "",
        status: false,
        role: ""
    },
    auth: () => null,
    isAuthenticated: false,
    logout: () => null
}

export const UserContext = createContext(UserContextDefaultValue);

