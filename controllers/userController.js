var userRepository = require('../repositories/userRepository');
const StatusCodes = require('http-status-codes').StatusCodes;
var bcrypt = require('bcryptjs');
const constants = require('../helpers/constants');

async function createUser(req, res) {
    console.log(req.body);

    try {
        // creating new user
        let user = req.body;
        let full_name = user.first_name + user.last_name;
        user.full_name = full_name;
        await userRepository.createUser(user);
        
        // sending response
        res.status(StatusCodes.CREATED)
        .send({
            "message": "success"
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            "message": error.message
        })
    }
    
}

async function setUpAccount(req, res) {
    var userId = req.params.user_id
    console.log("userId", userId)
    // password encryption to save it in db
    var salt = bcrypt.genSaltSync(constants.saltRounds);
    var passwordHash = bcrypt.hashSync(req.body.password, salt);

    let data = {
        "username": req.body.username,
        "password": passwordHash
    }

    try {
        await userRepository.createAccount(data, userId);
        res.status(StatusCodes.CREATED)
        .send({
            "message": "User created successfully.. Please login to continue"
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            "message": error.message
        })     
    }
}

async function verifyUserName(req, res, next) {
    let username = req.body.username;
     try {
         let alreadyExists = await userRepository.verifyUserName(username);

         if(alreadyExists) {
            res.status(StatusCodes.NOT_ACCEPTABLE)
            .send({
                "message": "Username already exists"
            })
         } else {
             next()
         }
     } catch (error) {
         res.status(StatusCodes.INTERNAL_SERVER_ERROR)
         .send({
             "message": error.message
         })
         
     }
}


async function getUser(req, res) {

    try {
        //get user 
        let userId = req.params.user_id;
        let user = await userRepository.getUser(userId);

        if(!user) {
            return res.status(StatusCodes.NOT_FOUND)
            .send({
                "message": "No user found"
            })
        }
        res.status(StatusCodes.OK)
        .send({
            "user": user
        })        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            "message": error.message
        })
    }
}

async function editUser(req, res) {

    let user = req.body;

    try {
        //edit user 
        let userId = req.params.user_id;
        user.full_name = user.first_name + user.last_name;
        let editUserId = await userRepository.editUser(user, userId);
        if(!editUserId) {
            return res.status(StatusCodes.NOT_FOUND)
            .send({
                "message": "No user found"
            })
        }
        res.status(StatusCodes.OK)
        .send({
            "user": user
        })        
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
            "message": error.message
        })
    }
}

async function deleteUser(req, res) {

    let user = req.body;
    let userId = req.params.user_id;

    try {
        let updateUserId = await userRepository.deleteUser(user, userId);
        if (!updateUserId) {
            return res.status(StatusCodes.NOT_FOUND)
                .send({
                    "message": "No user found"
                })
        }
        res.status(StatusCodes.OK)
        .send({
            "message": "User Deleted"
        })    
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
                "message": error.message
            })
    }
}

module.exports = {
    createUser,
    getUser,
    editUser,
    deleteUser,
    verifyUserName,
    setUpAccount
}