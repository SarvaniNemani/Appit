const loginSchema = {
    username: "string|lowercase|empty:false",
    password: "string|empty:false",
    $$strict: true
}

const refreshTokenSchema = {
    refresh_token: "string|empty:false",
    user_id: "number|empty:false",
    $$strict: true
}

module.exports = {
    loginSchema,
    refreshTokenSchema
}