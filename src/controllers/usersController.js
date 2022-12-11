const path = require('path')
const fs = require('fs')
const bcrypt = require('bcryptjs');

//Users in DB
const usersFilePath = path.join(__dirname, '../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

//validations
const { validationResult } = require('express-validator');
const { use } = require('../routes/users');

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
                    console.log(findedUser);
                    if (aproved) {
                        if (req.body.remember) {
                            res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
                        }
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
            res.redirect('/users/loggin')
        }
    },

    //REGISTER
    register: (req, res) => {
        res.render('./users/register')
    },

    registerUser: (req, res) => {
        try {
            let errors = validationResult(req)
            if (errors.isEmpty()) {
                let newUser = {
                    id: users.length + 1,
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    image: req.file ? req.file.filename : 'default.jpg'
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
                    return res.redirect('/users/loggin')
                }

            }
            else {
                return res.render('./users/register', { errors: errors.mapped(), old: req.body })
            }
        }
        catch {
            res.redirect('/users/register', { errors: { name: { msg: 'Las credenciales son invaldias' } } })
        }

    },

    //profile
    profile: (req, res) => {
        try {
            let userId = req.params.id
            let userProfile = users.find(element => element.id == userId)
            res.render('./users/profile', { user: userProfile })
        }
        catch {
            res.render('/')
        }
    },

    //edit user
    editUser: (req, res) => {
        let userId = req.params.id
        let userProfile = users.find(element => element.id == userId)
        res.render('./users/editUser', { user: userProfile })
    },
    userUpdate: (req, res) => {
        let parametro = req.params.id
        let userToEdit = users.find(element => element.id == parametro)
        let multerParam = req.file ? req.file.filename : undefined
        let editedUser = {
            id: parseInt(parametro),
            name: req.body.nameEdit,
            surname: req.body.surnameEdit,
            email: req.body.emailEdit,
            password: userToEdit.password,
            image: multerParam || userToEdit.image
        }
        let customedUsers = users.map(element => {
            if (element.id != parametro) {
                return element
            }
            else {
                return element = editedUser
            }
        })
        fs.writeFileSync(usersFilePath, JSON.stringify(customedUsers))
        res.redirect("/users/profile/" + parametro)
    },

    //loggOut
    loggOut: (req, res) => {
        res.clearCookie('email')
        req.session.destroy()
        return res.redirect('/')
    },

    choose: (req, res) => {
        res.render('./users/choose')
    },

    //delete usere
    deleteConfirm: (req, res) => {
        let userId = req.params.id
        let userProfile = users.find(element => element.id == userId)

        res.render('./users/deleteConfirm', { user: userProfile })
    },

    distroy: (req, res) => {
        let dataFilter = users.filter(element => (element.id != req.params.id))
        dataFilter.map((element, index) => {
            element.id = index + 1
        })
        fs.writeFileSync(usersFilePath, JSON.stringify(dataFilter))
        if (req.cookies.email) {
            res.clearCookie('email')
        }
        req.session.destroy()
        return res.redirect('/')
    }
}

module.exports = usersController