// Create user

const userSchema = {
    full_name: "string|empty:false",
    first_name: "string|empty:false",
    last_name: "string|empty:false",
    email: "email",
    phone: "number|optional",
    status: "boolean|optional",
    $$strict: true
}

const editUserSchema = {
    full_name: "string|empty:false|optional",
    first_name: "string|empty:false|optional",
    last_name: "string|empty:false|optional",
    email: "email|optional",
    phone: "number|optional",
    status: "boolean|optional",
    $$strict: true
}

module.exports = {
    userSchema,
    editUserSchema
}