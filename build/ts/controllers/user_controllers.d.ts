import { UserData, UserComponentData } from "../interfaces/user_interfaces";
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
    logout(): Promise<ResponseStatus>;
    get(): Promise<UserData>;
    isAuthenticated(): Promise<UserComponentData>;
}
export default User;
