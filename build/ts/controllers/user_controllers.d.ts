declare class User {
    constructor();
    signup(username: string, password: string): Promise<UserResponse>;
    login(username: string, password: string): Promise<UserResponse>;
    logout(): Promise<UserResponse>;
    get(): Promise<UserData>;
    isAuthenticated(): Promise<UserComponentData>;
    changePassword(oldPass: string, newPass: string): Promise<BasicResponse>;
    delete(): Promise<BasicResponse>;
}
export default User;
