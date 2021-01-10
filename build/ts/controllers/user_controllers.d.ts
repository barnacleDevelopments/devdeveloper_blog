import { UserData, UserComponentData } from "../interfaces/user_interfaces";
declare class User {
    constructor();
    login(username: string, password: string): Promise<void>;
    get(): Promise<UserData>;
    isAuthenticated(): Promise<UserComponentData>;
}
export default User;
