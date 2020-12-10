var express = require('express');
var router = express.Router();

var authController = require('../controllers/authorizationController');
var authorizationValidator = require('../validators/authorizationValidator');
var validateHelper = require('../helpers/validatorHelper');

//login
router.post(
    '/login', 
    validateHelper.validateBody(authorizationValidator.loginSchema), 
    authController.authenticateLoginDetails,
    authController.login
)

//logout
router.delete(
    '/:user_id/logout',
    authController.logout

)

module.exports = router;