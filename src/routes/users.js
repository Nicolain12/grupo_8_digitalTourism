const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.get('/', usersController.users)
router.get('/login', usersController.login)
router.get('/register', usersController.register)

module.exports = router