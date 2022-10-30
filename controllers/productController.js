const path = require('path')

const productController = {
    index: (req, res) =>{
        res.render('./products/product')
    }
}

module.exports=productController