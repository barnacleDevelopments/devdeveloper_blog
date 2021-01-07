export interface UserData {
    _id: string;
    username: string;
    password: string;
    posts: [];
    comments: [];
}
export interface UserStatus {
    status: boolean;
    role: string;
}
declare class User {
    constructor();
    get(): Promise<UserData>;
    isAuthenticated(): Promise<UserStatus>;
}
export default User;
