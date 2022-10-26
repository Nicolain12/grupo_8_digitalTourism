const path = require('path')

const loginController = {
    index: (req, res) =>{
        res.render('./users/login')
    }
}

module.exports=loginController