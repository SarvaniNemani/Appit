const Validator = require("fastest-validator");
const StatusCodes = require('http-status-codes').StatusCodes;

const dateFormat = 'YYYY/MM/DD';

let validator = new Validator({
    useNewCustomCheckerFunction: true,
    messages: {
		// Register our new error message text
		dateFormat: `The '{field}' field must be in '${dateFormat}' format!`
	}
});

function validateBody(schema) {

    return function(req, res, next) {

        let input = req.body;
        console.log(input);

        let result = validator.validate(input, schema);

        if(result === true) {
            next();
        } else {
            let errors = result.map( err => `${err.message}`);
            
            if(errors.count != 0) {
                return res.status(StatusCodes.OK).json({
                    status_code: StatusCodes.UNPROCESSABLE_ENTITY,
                    message: "Validation Errors",
                    errors: errors
                })
            } else {
                next()
            }
        }

    }
}

module.exports = {
    validateBody,
}