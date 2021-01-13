declare type ResponseStatus = {
    status: "success";
    message?: "";
} | {
    status: "failure";
    message?: "";
} | {
    status: "pending";
    message?: "";
};
declare class User {
    constructor();
    login(username: string, password: string): Promise<ResponseStatus>;
    logout(): Promise<ResponseStatus>;
    get(): Promise<UserData>;
    isAuthenticated(): Promise<UserComponentData>;
}
export default User;
