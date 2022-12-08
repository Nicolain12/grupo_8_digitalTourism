const path = require('path')
const fs = require('fs')
const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function isInSession (req, res, next) {
    res.locals.isLogged = false
    let userEmail = req.cookies.email
    if(userEmail){
        var userFound = users.find(element => element.email == userEmail)
        delete userFound.password
        req.session.userLogged = userFound

    }
    
    if (req.session && req.session.userLogged){
        res.locals.isLogged = true
        res.locals.userLogged = req.session.userLogged
    }
    next()
    
}
module.exports = isInSession