const express = require('express')
const path = require('path')
const app = express()


//routes requires
const indexRoutes = require('./routes/index.js')
const usersRoutes = require('./routes/users.js')
const productsRoutes = require('./routes/products.js')

// methodOverride
const methodOverride = require('method-override')
app.use(methodOverride ("_method"))

//public
const publicPath = path.resolve(__dirname, '../public')
app.use(express.static(publicPath))

//ejs
app.set('view engine', 'ejs')

// port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))

//uses
app.use('/', indexRoutes)
app.use('/users', usersRoutes)
app.use('/products', productsRoutes)

