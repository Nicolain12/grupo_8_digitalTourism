const path = require('path')

const productDetailController = {
    index: (req, res) =>{
        res.sendFile(path.join(__dirname, '../views/productDetail.html'))
    }
}

module.exports=productDetailController