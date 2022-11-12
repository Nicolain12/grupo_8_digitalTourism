const path = require('path')

const usersController = {
    users: (req, res) =>{
        //lista de usuarios
    },

    login: (req, res) =>{
        res.render('./users/login')
    },
    register: (req, res) =>{
        res.render('./users/register')
    }
}

module.exports = usersController