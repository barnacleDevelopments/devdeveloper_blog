/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: user_controller.ts
*/

// ENV VARIABLES
const PORT = 5000;

// INTERFACES
import { UserData, UserComponentData } from "../interfaces/user_interfaces";


type ResponseStatus = { status: "success", message?: "" } | { status: "failure", message?: "" } | { status: "pending", message?: "" };

class User {
    constructor() { }

    async logout(): Promise<ResponseStatus> {
        let recievedData: ResponseStatus = { status: "pending" }

        await fetch(`http://localhost:${PORT}/logout`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => recievedData = data)
            .catch(err => {
                console.log(err)
                recievedData = { status: "failure" }
            })

        return recievedData;
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
        let recievedData: UserComponentData | ResponseStatus = {
            _id: "", status: false, role: ""
        };

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