var express = require('express');
var router = express.Router();

var userValidator = require('../validators/userValidator');
var userController = require('../controllers/userController');
var validatorHelper = require('../helpers/validatorHelper');

//create user
router.post (
    ``,
    validatorHelper.validateBody(userValidator.userSchema),
    userController.createUser,
)

//create account
router.post (
    '/:user_id/setupAccount',
    validatorHelper.validateBody(userValidator.setUpAccount),
    userController.verifyUserName,
    userController.setUpAccount,
    
)

//get user
router.get (
    `/:user_id`,
    userController.getUser,
)

//edit user
router.put (
    `/:user_id`,
    userController.editUser,
    validatorHelper.validateBody(userValidator.editUserSchema),
)

//delete user
router.delete (
    `/:user_id`,
    userController.deleteUser,
)

module.exports = router;