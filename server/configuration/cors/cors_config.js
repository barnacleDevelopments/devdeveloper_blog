/*
AUTHOR: Devin Davis
DATE: Febuary 21st, 2021
FILE: admin_cors_config.js
*/

export const adminCorsOptions = {
    origin: "http://localhost:5000",
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE"
}

export const userCorsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    methods: "GET, POST"
}

export const guestCorsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
    methods: "GET"
}
