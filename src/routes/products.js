const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../../public/images/products')
        cb(null, folder)
    },
    filename: function (reg, file, cb) {
        let imageName ='products-' +  Date.now() + '-' + path.extname(file.originalname)
        cb(null, imageName)
    }
})
const upload = multer({ storage: storage })

router.get('/', productsController.products)
router.get('/customProduct', productsController.customProduct)

router.get('/product/:id', productsController.product)

router.get('/productCart', productsController.productCart)

router.get('/editProduct', productsController.editProduct)

router.get('/submitProduct', productsController.submitProduct)
router.post('/products', productsController.store); 

router.get('/productList', productsController.productList)

module.exports = router