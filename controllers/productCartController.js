const path = require('path')

const productCartController = {
    index: (req, res) =>{
        res.sendFile(path.join(__dirname, '../views/productCart.html'))
    }
}

module.exports=productCartController