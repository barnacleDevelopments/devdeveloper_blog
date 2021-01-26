/// <reference types="react" />
interface UserComponentData {
    _id: string;
    username: string;
    status: boolean;
    role: string;
}
interface UserContextData {
    user: UserComponentData;
    auth: () => void;
    isAuthenticated: Boolean;
    logout: () => void;
}
export declare const UserContextDefaultValue: UserContextData;
export declare const UserContext: import("react").Context<UserContextData>;
export {};
