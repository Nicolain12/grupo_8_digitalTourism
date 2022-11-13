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

    store: (req, res)=>{
        let newProduct = {
            id: products.length + 1,
            Departure: req.body.departure,
            Reach: req.body.reach,
            departureDate: req.body.date-departure,
            ReturnDate: req.body.date-reach,
            departureHour: req.body.hour-departure,
            returnHour: req.body.hour-reach,
            hotel: req.body.hotel,
            description: req.body.description,
            cabin: req.body.cabin,
            service: req.body.service,
            passengers: req.body.passengers,
            onSale: req.body.onSale,
            price: (req.body.price) * (req.body.passengers),
		}

		products.push(newProduct)
   
		 fs.writeFileSync(productsFilePath, JSON.stringify(products))
		 
		 res.redirect("/products/productList")
    },

    productList: (req, res) => {
        res.render('./products/ProductList', {products:products})

    }
}

module.exports = productsController