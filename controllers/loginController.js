const path = require('path')

const loginController = {
    index: (req, res) =>{
        res.sendFile(path.join(__dirname, '../views/login.html'))
    }
}

module.exports=loginController