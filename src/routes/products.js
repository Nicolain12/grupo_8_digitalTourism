const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productsController')
const path = require('path');
const isGuesth = require('../middlewares/isGuesth.js')

//MULTER
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
router.get('/', isGuesth, productsController.productList)
router.get('/Onsale', isGuesth, productsController.onSale)

//Personalize your product
router.get('/customProduct', isGuesth, productsController.customProduct)

//specific product
router.get('/detail/:id', isGuesth, productsController.product)


//Product cart
router.get('/productCart', isGuesth, productsController.productCart)
router.post('/saveCart/:id', isGuesth, productsController.saveCart)

//Delete one cart product
router.delete('/cart/:id', isGuesth, productsController.deleteCartProduct)


//Edit product
router.get('/:id/edit', isGuesth, productsController.editProduct)
router.put('/:id', isGuesth, upload.single('productFile'), productsController.upload)

// Add new product
router.get('/submitProduct', isGuesth, productsController.submitProduct)
router.post('/products', isGuesth, upload.single('productFile'), productsController.store); 

//Delete one product
router.delete('/:id', isGuesth, productsController.deleteProduct)



module.exports = router