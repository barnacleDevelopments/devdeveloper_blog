/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: user_interfaces.ts
*/

// INTERFACES
interface UserData {
    _id: string,
    username: string,
    password: string,
    posts: [],
    comments: []
}

interface UserComponentData {
    _id: string,
    status: boolean,
    role: string,
    username: string
}

interface NewUserData {
    username: string,
    password: string
}

interface UserFormData {
    [index: string]: string,
    username: string,
    password: string
}

interface NewUserFormData {
    username: string,
    password: string,
    password: string
}

type UserStatus = boolean
