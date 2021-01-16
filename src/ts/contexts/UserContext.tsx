import { createContext } from "react";

export const UserContext = createContext({
    _id: "",
    username: "",
    status: false,
    role: ""
});