const path = require('path')

const productsController = {
    products: (req, res) =>{
        res.render('./products/productsList')
    },
    customProduct: (req, res) =>{
        res.render('./products/customProduct')
    },
    product: (req, res) =>{
        res.render('./products/product')
    },
    productCart: (req, res) =>{
        res.render('./products/productCart')
    },
    editProduct: (req, res) =>{
        res.render('./products/editProduct')
    },
    submitProduct: (req, res) =>{
        res.render('./products/submitProduct')
    },
}

module.exports = productsController