const path = require('path')

const customController = {
    index: (req, res)=>{
        res.render('customProduct')
    }
}

module.exports = customController
