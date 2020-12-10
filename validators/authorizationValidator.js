const loginSchema = {
    username: "string|lowercase|empty:false",
    password: "string|empty:false",
    $$strict: true
}

module.exports = {
    loginSchema,
}