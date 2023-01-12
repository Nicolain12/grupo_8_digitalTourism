// const path = require('path')
// const fs = require('fs')


// function isInSession (req, res, next) {
//     res.locals.isLogged = false
//     let userEmail = req.cookies.email
//     if(userEmail){
//         var userFound = users.find(element => element.email == userEmail)
//         req.session.userLogged = userFound
//     }
    
//     if (req.session && req.session.userLogged){
//         res.locals.isLogged = true
//         res.locals.userLogged = req.session.userLogged
//     }
//     next()
    
// }
// module.exports = isInSession