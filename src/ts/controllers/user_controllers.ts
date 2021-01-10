/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: user_controller.ts
*/

// ENV VARIABLES
const PORT = 5000;

// INTERFACES
import { UserData, UserComponentData, NewUserData } from "../interfaces/user_interfaces";

class User {
    constructor() { }

    async login(username: string, password: string) {
        let recievedData: NewUserData = {
            username: username,
            password: password
        }
        await fetch(`http://localhost:${PORT}/login`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(recievedData)
        }).then(response => {
            if (!response.ok) {
                throw new Error("Network response not ok.")
            }
        }).catch(err => console.log(err))
    }

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
        let recievedData: UserComponentData = { _id: "", status: false, role: "" };

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