const path = require('path')

const customController = {
    index: (req, res)=>{
        res.render('./products/customProduct')
    }
}

module.exports = customController
