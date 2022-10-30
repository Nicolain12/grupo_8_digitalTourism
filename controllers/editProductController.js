const path = require('path')

const productController = {
    index: (req, res) =>{
        res.render('./products/editProduct')
    }
}

module.exports=productController