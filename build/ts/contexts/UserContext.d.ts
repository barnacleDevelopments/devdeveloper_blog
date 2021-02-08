/// <reference types="react" />
interface UserComponentData {
    _id: string;
    username: string;
    role: string;
}
interface UserContextData {
    user: UserComponentData;
    isError: boolean;
    isAuthenticated: Boolean;
    userErrorMessage: string;
    setUserErrorMessage(message: string): void;
    setIsError(status: boolean): void;
    auth: () => void;
    logout: () => void;
    login: (username: string, password: string) => void;
    signup: (username: string, password: string) => void;
}
export declare const UserContextDefaultValue: UserContextData;
export declare const UserContext: import("react").Context<UserContextData>;
export {};
