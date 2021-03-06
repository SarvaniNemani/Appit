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

// refresh token
router.post(
    '/refreshToken',
    validateHelper.validateBody(authorizationValidator.refreshTokenSchema),
    authController.refreshToken
)

//forget password
router.post(
    '/forgotPassword', 
    authController.forgotPassword
)

//reset password
router.post(
    '/resetPassword',
    authController.resetPassword
)
//logout
router.post(
    '/:user_id/logout',
    authController.logout

)

module.exports = router;