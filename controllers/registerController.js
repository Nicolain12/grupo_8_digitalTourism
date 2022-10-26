const path = require('path')

const registerController = {
    index: (req, res) =>{
        res.render('./users/register')
    }
}

module.exports=registerController