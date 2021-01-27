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
    logout: () => void,
    login: (username: string, password: string) => void
}

export const UserContextDefaultValue: UserContextData = {
    auth: () => null,
    isAuthenticated: false,
    logout: () => null,
    login: () => null,
    user: {
        _id: "",
        username: "",
        status: false,
        role: ""
    }
}

export const UserContext = createContext(UserContextDefaultValue);

