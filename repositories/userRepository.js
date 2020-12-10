const dbConnection = require('../knexfile');
const knex = require("knex")(dbConnection);

function createUser (user) {
    return new Promise((resolve, reject) => {
        knex('user')
        .insert(user)
        .catch(function (error){
            reject(error);
        })
        .then(function (insertId) {
            console.log("insertId", insertId[0]),
            resolve(insertId[0])
        })
    })
}

function verifyUserName (username) {
    return new Promise((resolve, reject) => {
        knex.first()
        .from('user')
        .where('username',username)
        .catch( function(error) {
            reject(error)
        })
        .then(function(data) {
            if(data) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}

function createAccount(data, userId) {
    return new Promise((resolve, reject) => {
        knex('user')
            .where('id', userId)
            .update(data)
            .catch(function (error) {
                reject(error)
            })
            .then(function (insertId) {
                console.log("insertId", insertId[0])
                resolve(insertId[0])
            }) 
    })  
}

function getUser (userId) {
    return new Promise((resolve, reject) => {
        
        let query = `SELECT * FROM user WHERE id=${userId};`
        knex.raw(query)
        .catch(function (error) {
            reject(error);
        })
        .then(function (user) {
            resolve(user[0][0])
        })
    })
}

function editUser (user, userId) {
    return new Promise((resolve, reject) => {
        knex('user')
            .where('id', userId)
            .update(user)
            .catch(function (error) {
                reject(error)
            })
            .then(function (insertId) {
                resolve(insertId);
            })
    })
}

function deleteUser (user, userId) {
    return new Promise((resolve, reject) => {
        knex('user')
        .where('id', userId)
        .update(user)
        .catch(function(error) {
            reject(error)
        })
        .then(function (insertId) {
            resolve(insertId);
        })

    })
}
module.exports = {
    createUser,
    getUser,
    editUser,
    deleteUser,
    verifyUserName,
    createAccount
}
