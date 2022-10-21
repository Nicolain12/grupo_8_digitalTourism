const path = require('path')

const customController = {
    index: (req, res)=>{
        res.sendFile(path.join(__dirname, '../views/customProduct.html'))
    }
}

module.exports = customController
