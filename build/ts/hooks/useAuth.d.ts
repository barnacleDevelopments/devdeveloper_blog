declare const _default: () => {
    user: UserComponentData;
    auth: () => void;
    isAuthenticated: Boolean;
    logout: () => void;
    login: (username: string, password: string) => void;
    errMessage: String;
};
export default _default;
