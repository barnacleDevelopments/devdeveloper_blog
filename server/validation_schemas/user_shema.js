/*
AUTHOR: Devin Davis
DATE: January 15th, 2021
FILE: user_schema.js
*/

import * as yup from "yup";

const userValSchema = yup.object().shape({
    username: yup.string().required().trim().min(6).max(20),
    password: yup.string().required().trim().min(8).max(20)
})

export default userValSchema;