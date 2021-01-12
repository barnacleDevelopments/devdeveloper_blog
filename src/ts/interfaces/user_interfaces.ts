/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: user_interfaces.ts
*/

// INTERFACES
export interface UserData {
    _id: string,
    username: string,
    password: string,
    posts: [],
    comments: []
}

export interface UserComponentData {
    _id: string,
    status: boolean,
    role: string,
    username: string
}

export interface NewUserData {
    username: string,
    password: string
}

export interface UserFormData {
    [index: string]: string,
    username: string,
    password: string
}

export type UserStatus = boolean
