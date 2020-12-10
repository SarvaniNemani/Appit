const { StatusCodes } = require("http-status-codes");
const helper = require("../helpers/helper");
const authorizationRepository = require("../repositories/authorizationRepository");
const { v4: uuidv4 } = require('uuid');

async function authenticateLoginDetails(req, res, next) {
    try {
        //getting user
        var user = await authorizationRepository.getUserForUsername(req.body.username);
        // user does not exist
        if(!user) {
            return res.status(StatusCodes.NOT_FOUND)
            .send({
                "message": "Username does not exist"
            })
        }
        //compare passwords
        var success = await helper.comparePasswords(req.body.password, user.password);
        console.log(success);
        // console.log("validate password",success)

        //wrong password
        if(success == false) {
            res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION)
            .send({
                "message": "Invalid credentials"
            })
        }
        //success
        req.user = user;
        next()
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            "message": error.message
        })
        
    }

}

async function login(req, res) {
    try {
        var user = req.user;
        var token = uuidv4();

        var data = {
            "user_id": user.id,
            "token": token
        }
        var insertId = await authorizationRepository.insertToken(data)
        res.status(StatusCodes.OK)
        .send({
            "token": token,
            "user": {
                "id": user.id,
                "username": user.username,
                "full_name": user.full_name,
                "email": user.email
            }
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            "message": error.message
        })
        
    }
}

async function logout(req, res) {
    try {
        let userId = req.params.user_id;
        
        var insertId = await authorizationRepository.removeToken(userId)
        res.status(StatusCodes.OK)
        .send({
            "message" : "logged out"
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            "message": error.message
        })
    }
}
module.exports = {
    authenticateLoginDetails,
    login,
    logout
}