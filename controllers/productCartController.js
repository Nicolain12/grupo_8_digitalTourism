const path = require('path')

const productCartController = {
    index: (req, res) =>{
        res.render('./products/productCart')
    }
}

module.exports=productCartController