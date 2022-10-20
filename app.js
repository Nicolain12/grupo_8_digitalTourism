const express = require('express')
const path = require('path')
const app = express()

const indexRoutes = require('./routes/index.js')
const customRoutes = require('./routes/customProduct.js')
const loginRoutes = require('./routes/login.js')
const productCartRoutes = require('./routes/productCart.js')
const productDetailRoutes = require('./routes/productDetail.js')
const registerRoutes = require('./routes/register.js')

const publicPath = path.resolve(__dirname, './public')
app.use(express.static(publicPath))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))

app.use('/', indexRoutes)
app.use('/customProduct', customRoutes)
app.use('/login', loginRoutes)
app.use('/productCart', productCartRoutes)
app.use('/productDetail', productDetailRoutes)
app.use('/register', registerRoutes)
