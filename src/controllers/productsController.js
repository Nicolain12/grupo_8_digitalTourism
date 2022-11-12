const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../dataBase/product.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
    products: (req, res) =>{
        res.render('./products/productsList')
    },
    customProduct: (req, res) =>{
        res.render('./products/customProduct')
    },
    product: (req, res) =>{
        let product = products.find(element => element.id == req.params.id)
        res.render('./products/product', {product: product})
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
    productList: (req, res) => {
        res.render('./products/ProductList', {products:products})

    }
}

module.exports = productsController