const express = require('express')
const routes = express.Router()
const editProducController = require('../controllers/editProductController')

routes.get('/', editProducController.index)

module.exports = routes