/// <reference types="react" />
declare const _default: () => {
    user: UserComponentData;
    auth: () => void;
    isAuthenticated: boolean;
    logout: () => void;
    login: (username: string, password: string) => void;
    isError: boolean;
    setIsError: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    setUserErrorMessage: import("react").Dispatch<import("react").SetStateAction<string>>;
    userErrorMessage: string;
    signup: (username: string, password: string) => void;
};
export default _default;
