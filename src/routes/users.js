const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const path = require('path');
const authLogg = require('../middlewares/authLogg')


//VALIDATIONS
const {body} = require('express-validator')
const validationsRegister = [
    body('name')
        .notEmpty().withMessage('Debes introducir un nombre').bail()
        .isLength({min: 2, max: 50}).withMessage('Debes introducir un nombre valido'),

    body('surname')
        .notEmpty().withMessage('Debes introducir un apellido').bail()
        .isLength({min: 2, max: 50}).withMessage('Debes introducir un apellido valido'),

    body('email')
        .notEmpty().withMessage('Tienes que introducir un Email').bail()
        .isEmail().withMessage('Tienes que introducir un Email valido').bail()
        .isLength({min: 5, max: 100}).withMessage('Tienes que introducir un Email valido'),

    body('password')
        .notEmpty().withMessage('Debes introducir una contraseña')
]

const validationsLoggin = [
    body('email')
        .notEmpty().withMessage('Tienes que introducir un Email').bail()
        .isEmail().withMessage('Tienes que introducir un Email valido'),
        body('password')
        .notEmpty().withMessage('Debes introducir una contraseña'),
]

//MULTER
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../../public/images/users')
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        let imageName ='user-' +  Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
})
const upload = multer({ storage: storage })

//list products
router.get('/', authLogg, usersController.users)

//choose
router.get('/choose', authLogg, usersController.choose)

//profile
router.get('/profile', usersController.profile)

//edit user
router.get('/editUser', usersController.editUser)
router.put('/userUpdate/:id', usersController.userUpdate)

//login
router.get('/loggin', authLogg, usersController.login)
router.post('/loggin', authLogg, validationsLoggin, usersController.loggSubmit)

//loggOut
router.post('/loggOut', validationsLoggin, usersController.loggOut)

//register
router.get('/register', authLogg, usersController.register)
router.post('/registerUser', authLogg, upload.single('userImg'), validationsRegister, usersController.registerUser)

module.exports = router