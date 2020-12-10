const dbConnection = require('../knexfile');
const knex = require("knex")(dbConnection);

function getUserForUsername(username) {
    return new Promise((resolve, reject) => {
        let query = `SELECT DISTINCT user.id, user.username, user.password, user.full_name, user.email from user
                    where user.username = "${username}";`
        knex.raw(query)
            .catch( function(error) {
                reject(error)
            })
            .then(function(user) {
                try {
                    console.log(user[0][0])
                    let details = user[0][0]
                    if (details.id) {
                        resolve(details)
                    } else {
                        resolve()
                    }
                } catch (error) {
                    resolve()
                }
            })
    })
}

function insertToken(data) {
    return new Promise((resolve, reject) => {

        knex('user_access_token')
            .insert(data)
            .catch(function (error) {
                reject(error)
            })
            .then(function (insertId) {
                console.log("insertId", insertId)
                resolve()
            }) 
    })  
}

function removeToken(userid) {
    return new Promise((resolve, reject) => {
        let query = `DELETE FROM user_access_token WHERE user_id = "${userid}";`
        knex.raw(query)
            .catch(function (error) {
                reject(error)
            })
            .then(function() {
                resolve()
            })
    })
}
module.exports = {
    getUserForUsername,
    insertToken,
    removeToken
}
