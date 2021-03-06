const { StatusCodes } = require("http-status-codes");
const helper = require("../helpers/helper");
const authorizationRepository = require("../repositories/authorizationRepository");
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const config = require('../config/config');
var bcrypt = require('bcryptjs');
const constants = require('../helpers/constants');

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
        // generate access token
        var token = uuidv4();
        var accessExpiry = new moment(Date.now()).add(2, 'hours').format('YYYY-MM-DD HH:mm:ss');
        var data = {
            "user_id": user.id,
            "token": token,
            "expiry_date": accessExpiry
        }
        var insertId = await authorizationRepository.insertToken(data)
                
        // generate refresh token
        var refresh_token = uuidv4();
        var refreshExpiry = new moment(Date.now()).add(20, 'hours').format('YYYY-MM-DD HH:mm:ss');
        var refreshData = {
            "user_id": user.id,
            "refresh_token": refresh_token,
            "access_token": token,
            "expiry_date": refreshExpiry
        }

        var reftoken = await authorizationRepository.insertRefreshToken(refreshData)
        res.status(StatusCodes.OK)
        .send({
            "token": token,
            "refresh_token": refresh_token,
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
async function refreshToken(req, res, next) {

    var refreshToken = req.body.refresh_token;

    // validate refresh token
    try {
        var refreshTokenRecord = await authorizationRepository.getRefreshToken(refreshToken, req.body.user_id);
        if (refreshTokenRecord) {
            req.refreshToken = refreshTokenRecord;
            var userId = req.body.user_id;
            // generate new access token            
            var token = uuidv4();
            var updateToken = await authorizationRepository.updateToken(userId, token);
            var updateAccessToken = await authorizationRepository.updateAccessToken(req.refreshToken.refresh_token, token);
            res.status(StatusCodes.OK).send({
                "status_code": StatusCodes.OK,
                "access_token": token,
                "refresh_token": req.refreshToken.refresh_token
            })
        } else {
            res.status(StatusCodes.OK)
                .send({
                    "status_code": StatusCodes.NON_AUTHORITATIVE_INFORMATION,
                    "message": "Expired/Invalid refresh token. Please login again"
                })
        }
    } catch (error) {
        res.status(StatusCodes.OK)
            .send({
                "status_code": StatusCodes.INTERNAL_SERVER_ERROR,
                "message": error.message
            })
    }
}

//forget password
async function forgotPassword(req, res, next) {
    try {
        //check if user exist
        let user = await authorizationRepository.getUserForUsername(req.body.username);
        if (!user) {
            return res.status(StatusCodes.OK)
                .send({
                    "status_code": StatusCodes.NOT_FOUND,
                    "message": "username does not exists"
                })
        }
        //generate token
        var token = uuidv4();
        var tokenExpiry = new moment(Date.now()).add(2, 'hours').format('YYYY-MM-DD HH:mm:ss');
        var data = {
            "user_id": user.id,
            "token": token,
            "expiry_date": tokenExpiry
        }
        var insertId = await authorizationRepository.resetPasswordToken(data);
        //url
        let resetPath = `resetPassword/${token}`;
        let url = `https://localhost:3000/${resetPath}`;
        console.log(url);
        console.log(`send reset mail from ${config.sourceEmail} to ${user.email}.`)
        res.status(StatusCodes.OK)
        .send({
            "status_code": StatusCodes.OK,
            "message": "A reset link has been sent to your registered email.",
            "link": url
        })

    } catch (error) {
        res.status(StatusCodes.OK)
            .send({
                "status_code": StatusCodes.INTERNAL_SERVER_ERROR,
                "message": error.message
            })
    }    
}

// reset password
async function resetPassword(req, res) {
    try {
        var token = req.body.token;
        // validating given token
        var userId = await authorizationRepository.tokenValidation(token);
        if (!userId) {
            return res.status(StatusCodes.OK)
                .send({
                    "status_code": StatusCodes.INTERNAL_SERVER_ERROR,
                    "message": "Invalid token or token expired"
                })
        }
        // hash password and updating in db
        var salt = bcrypt.genSaltSync(constants.saltRounds);
        var passwordHash = bcrypt.hashSync(req.body.password, salt);

        var newPassword = await authorizationRepository.updatePassword(userId, passwordHash);
        // clear reset token
        await authorizationRepository.deleteResetToken(token);
        res.status(StatusCodes.OK)
            .send({
                "status_code": StatusCodes.OK,
                "message": "Password updated successfully"
            })
        
    } catch (error) {
        res.status(StatusCodes.OK)
            .send({
                "status_code": StatusCodes.INTERNAL_SERVER_ERROR,
                "message": error.message
            })
    }
}

async function logout(req, res) {
    try {
        // let userId = req.params.user_id;
        var token = req.headers['authorization'];
        
        // var insertId = await authorizationRepository.removeToken(userId);
        var insertId = await authorizationRepository.removeToken(token);
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
    forgotPassword,
    resetPassword,
    refreshToken,
    logout
}