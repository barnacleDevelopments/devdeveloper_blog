/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: user_controller.ts
*/

// ENV VARIABLES
const PORT = 5000;

// INTERFACES
export interface UserData {
    _id: string,
    username: string,
    password: string,
    posts: [],
    comments: []
}

export interface UserStatus {
    status: boolean,
    role: string
}

class User {
    constructor() { }

    async get() {
        let recievedData: UserData = {
            _id: "",
            username: "",
            password: "",
            posts: [],
            comments: []
        }
        await fetch(`http://localhost:${PORT}/user`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                recievedData = data;
            });
        return recievedData
    }

    async isAuthenticated() {
        let recievedData: UserStatus = { status: false, role: "" };

        await fetch(`http://localhost:${PORT}/isloggedin`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                recievedData = data;
            });
        return recievedData
    }
}

export default User;