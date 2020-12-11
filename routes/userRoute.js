var express = require('express');
var router = express.Router();

var userValidator = require('../validators/userValidator');
var userController = require('../controllers/userController');
var validatorHelper = require('../helpers/validatorHelper');
var helper = require('../helpers/helper');

// create user
router.post (
    ``,
    helper.authorize,
    validatorHelper.validateBody(userValidator.userSchema),
    userController.createUser,
)

// create super user
router.post (
    `/superuser`,
    validatorHelper.validateBody(userValidator.userSchema),
    userController.createUser,
)

//create account
router.post (
    '/:user_id/setupAccount',
    validatorHelper.validateBody(userValidator.setUpAccountSchema),
    userController.verifyUserName,
    userController.setUpAccount,
    
)

//get user
router.get (
    `/:user_id`,
    helper.authorize,
    userController.getUser,
)

//edit user
router.put (
    `/:user_id`,
    validatorHelper.validateBody(userValidator.editUserSchema),
    userController.editUser,  
)

//delete user
router.delete (
    `/:user_id`,
    helper.authorize,
    userController.deleteUser,
)

module.exports = router;