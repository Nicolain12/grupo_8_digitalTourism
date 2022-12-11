function isGuesth (req, res, next) {
    if( !res.locals.isLogged ){
        return res.render('users/register', {errors:{firstLogg:{msg:'PRIMERO DEBES REGISTRARTE'}}})
    }
    next()
}
module.exports = isGuesth


