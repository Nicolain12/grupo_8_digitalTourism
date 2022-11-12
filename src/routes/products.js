const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

router.get('/', productsController.products)
router.get('/customProduct', productsController.customProduct)
router.get('/product', productsController.product)
router.get('/productCart', productsController.productCart)
router.get('/editProduct', productsController.editProduct)
router.get('/submitProduct', productsController.submitProduct)

module.exports = router