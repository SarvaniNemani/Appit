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
        knex('user')
        .leftJoin('user_address','user.id','user_address.user_id')
        .where('user.id', userId)
        .catch(function (error) {
            reject(error);
        })
        .then(function (user) {
            resolve(user)
        })
    })
}

function getAllUsers (str, status, limit, offset) {
    return new Promise((resolve, reject) => {
        if (status == undefined) {
            var query = `SELECT * from user where first_name like '%${str}%' ORDER BY created_at DESC limit ${limit} offset ${offset};`           
        } else {
            var query = `SELECT * from user where first_name like '%${str}%' and status = ${status} ORDER BY created_at DESC limit ${limit} offset ${offset};`
        }

        knex.raw(query)
        .catch(function (error) {
            reject(error);
        })
        .then(function (user) {
            resolve(user[0])
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

function editAddress (address, userId) {
    return new Promise((resolve, reject) => {
        knex('user_address')
        .insert(address)
        .onConflict(userId)
        .merge()
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
    getAllUsers,
    editUser,
    editAddress,
    deleteUser,
    verifyUserName,
    createAccount,
}
