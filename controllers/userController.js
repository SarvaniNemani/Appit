var userRepository = require('../repositories/userRepository');
const StatusCodes = require('http-status-codes').StatusCodes;

async function createUser(req, res) {
    console.log(req.body);

    try {
        // creating new user
        await userRepository.createUser(req.body);
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
    deleteUser
}