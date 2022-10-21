const express = require('express')
const router = express.Router()
const productDetailController = require('../controllers/productDetailController')

router.get('/', productDetailController.index)

module.exports=router