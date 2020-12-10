const bcrypt = require('bcryptjs')

function comparePasswords(input, hash) {
    console.log("comparePasswords", input);
    return new Promise((resolve, reject) => {
        bcrypt.compare(input, hash, function(err, res) {
            console.log(err, res);
            if(err) {
                reject(err)
            } else {
                resolve(res)
                console.log("end")
            }
        });
    });
}

module.exports = {
    comparePasswords,
}