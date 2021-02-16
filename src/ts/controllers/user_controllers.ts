/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: user_controller.ts
*/

// ENV VARIABLES
const PORT = 5000;

// INTERFACES


class User {
    constructor() { }

    async signup(username: string, password: string): Promise<UserResponse> {
        let recievedData: UserResponse = { status: "pending" }

        const searchParams = new URLSearchParams()
        searchParams.append("username", username)
        searchParams.append("password", password)

        await fetch(`http://localhost:5000/signup`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/x-www-form-urlencoded"
            },
            body: searchParams
        }).then(response => response.json())
            .then(data => recievedData = data)
            .catch(() => recievedData = { status: "error" });

        return recievedData;
    }

    async login(username: string, password: string): Promise<UserResponse> {
        let recievedData: UserResponse = { status: "pending" }

        const searchParams = new URLSearchParams()
        searchParams.append("username", username)
        searchParams.append("password", password)

        await fetch(`http://localhost:5000/login`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/x-www-form-urlencoded"
            },
            body: searchParams
        }).then(response => response.json())
            .then(data => recievedData = data)
            .catch(() => recievedData = { status: "error" })


        return recievedData;
    }

    async logout(): Promise<UserResponse> {
        let recievedData: UserResponse = { status: "pending" }

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
            .catch(() => {
                recievedData = { status: "error" }
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
        let recievedData: UserComponentData = {
            _id: "",
            role: "",
            username: ""
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
            .then(data => recievedData = data);

        return recievedData
    }

    async changePassword(oldPass: string, newPass: string): Promise<BasicResponse> {
        let recievedData: BasicResponse = {
            status: "pending"
        }

        const searchParams = new URLSearchParams()
        searchParams.append("oldPass", oldPass)
        searchParams.append("newPass", newPass)

        await fetch(`http://localhost:${PORT}/changePassword`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/x-www-form-urlencoded",
                "Access-Control-Request-Method": "PUT"
            },
            body: searchParams
        })
            .then(response => response.json())
            .then(data => recievedData = data)

        return recievedData;
    }

    async delete(): Promise<BasicResponse> {
        let recievedData: BasicResponse = {
            status: "pending"
        }

        await fetch(`http://localhost:${PORT}/deleteAccount`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Request-Method": "DELETE",

            }
        })
            .then(response => response.json())
            .then(data => recievedData = data)

        return recievedData;
    }
}

export default User;