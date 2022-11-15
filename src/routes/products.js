const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = path.join(__dirname, '../../public/images/products')
        cb(null, folder)
    },
    filename: function (req, file, cb) {
        let imageName ='products-' +  Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
})
const upload = multer({ storage: storage })

//List of products
router.get('/', productsController.productList)
router.get('/Onsale', productsController.onSale)

//Personalize your product
router.get('/customProduct', productsController.customProduct)

//specific product
router.get('/detail/:id', productsController.product)


//Product cart
router.get('/productCart', productsController.productCart)

//Edit product
router.get('/:id/edit', productsController.editProduct)
router.put('/:id', upload.single('productFile'), productsController.upload)

// Add new product
router.get('/submitProduct', productsController.submitProduct)
router.post('/products', upload.single('productFile'), productsController.store); 

//Delete one product
router.delete('/:id', productsController.deleteProduct)


module.exports = router