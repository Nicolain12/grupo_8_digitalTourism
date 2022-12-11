const path = require('path')
const fs = require('fs')
const bcrypt = require('bcryptjs');

//Users in DB
const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

//validations
const { validationResult } = require('express-validator')

const usersController = {
    //List of users
    users: (req, res) => {
    },

    //Loggin
    login: (req, res) => {
        res.render('./users/loggin')
    },

    loggSubmit: (req, res) => {
        try {
            let errors = validationResult(req)
            if (errors.isEmpty()) {
                let findedUser = users.find(element => element.email == req.body.email)
                if (findedUser) {
                    let aproved = bcrypt.compareSync(req.body.password, findedUser.password)
                    if (aproved) {
                        if (req.body.remember) {
                            res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
                        }
                        delete findedUser.password
                        req.session.userLogged = findedUser
                        return res.redirect('/')
                    } else {
                        return res.render('./users/loggin', {
                            errors: {
                                email: {
                                    msg: 'Las credenciales son invalidas'
                                }
                            }
                        })
                    }
                } else {
                    return res.render('./users/loggin', {
                        errors: {
                            email: {
                                msg: 'Las credenciales son invalidas'
                            }
                        }
                    })
                }
            } else {
                return res.render('./users/loggin', { errors: errors.mapped(), old: req.body })

            }

        }

        catch {
            res.redirect('/users/loggin', {errors:{
                email:{
                    msg: 'Las credenciales son invalidas'
                }
            }})
        }
    },

    //REGISTER
    register: (req, res) => {
        res.render('./users/register')
    },

    registerUser: (req, res) => {
    try{
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            let newUser = {
                id: users.length + 1,
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                image: req.file ? req.file.filename : null
            }

            if (req.body.password != req.body.passwordConfirm) {
                return res.render('./users/register', {
                    errors: {
                        passwordConfirm: {
                            msg: 'Las contraseñas deben ser iguales'
                        }
                    }
                })
            }

            let userInDb = users.find(element => element.email == req.body.email)
            if (userInDb) {
                return res.render('./users/register', {
                    errors: {
                        email: {
                            msg: 'El Email ya se encuentra registrado'
                        }
                    }
                })
            } else {
                users.push(newUser)
                fs.writeFileSync(usersFilePath, JSON.stringify(users))
                delete newUser.password
                req.session.userLogged = newUser
                return res.redirect('/')
            }
        }
        else {
            return res.render('./users/register', { errors: errors.mapped(), old: req.body })
        }
    }
    catch{
        res.redirect('/users/register', {errors:{name:{msg:'Las credenciales son invaldias'}}})
    }

    },

    //profile
    profile: (req, res) => {
        res.render('./users/profile')
    },

    //edit user
    editUser: (req,res) => {
        res.render('./users/editUser')
    },
    userUpdate: (req,res) => {
      console.log(req.session.userLogged);  
    },
    //loggOut
    loggOut: (req, res) => {
        res.clearCookie('email')
        req.session.destroy()
        return res.redirect('/')
    },

    choose: (req, res) => {
        res.render('./users/choose')
    }
}

module.exports = usersController