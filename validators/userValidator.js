// Create user schema

const constants = require("../helpers/constants")

const userSchema = {
    first_name: "string|empty:false",
    last_name: "string|empty:false",
    email: "email",
    phone: "number|optional",
    status: "boolean|optional",
    $$strict: true
}

// create account
const setUpAccountSchema ={
    username: "string|lowercase|empty:false|alphanum",
    password: `string|empty:false|min:${constants.passwordLength}`,
    $$strict: true
}

// edit user schema
const editUserSchema = {
    first_name: "string|empty:false|optional",
    last_name: "string|empty:false|optional",
    email: "email|optional",
    phone: "number|optional",
    status: "boolean|optional",
    $$strict: true
}

module.exports = {
    userSchema,
    editUserSchema,
    setUpAccountSchema
}