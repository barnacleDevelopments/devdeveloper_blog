/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: user_interfaces.ts
*/

import { UserContext } from "@auth0/nextjs-auth0"

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
    role: string,
    username: string
}

interface NewUserData {
    username: string,
    password: string
}

interface UserPasswordChangeData {
    oldPassword: string,
    newPassword: string
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

type UserRole = "administrator" | "user"

interface user extends UserContext.user {
    ["http://reallyuniquenamespace.com/roles"]: Array
}


interface CustomUserContext extends UserContext {
    user: user | UserContext.user

}