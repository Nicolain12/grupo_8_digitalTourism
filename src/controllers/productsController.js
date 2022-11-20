const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator') 

const productsFilePath = path.join(__dirname, '../dataBase/product.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const cartFilePath = path.join(__dirname, '../dataBase/cart.json');
const cartProducts = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));

const productsController = {

    customProduct: (req, res) =>{
        res.render('./products/customProduct')
    },

// Detail for one especific product
    product: (req, res) =>{
        let product = products.find(element => element.id == req.params.id)
        res.render('./products/product', {product: product})
    },


// Cart of product
    productCart: (req, res) =>{
        if(cartProducts.length == 0){
            return res.render('./products/emptyCart')
        }else{        
            return res.render('./products/productCart', {products: cartProducts})
        }
  
    },
    saveCart: (req, res) =>{
        let productToSaveId = req.params.id
        let toSave = products[productToSaveId - 1]
        cartProducts.push(toSave)
        fs.writeFileSync(cartFilePath, JSON.stringify(cartProducts))
        res.redirect('/products') 
    },
// Deleating cart product
    deleteCartProduct: (req,res) =>{
        let productToRemove = req.params.id
        let dataCartFilter = cartProducts.filter(element => (element.id != productToRemove)) 
        dataCartFilter.map((element, index) => {
            element.id = index + 1 
        })
		fs.writeFileSync(cartFilePath, JSON.stringify(dataCartFilter))
		res.redirect('/products/productCart')
    },

// Upload new information in one product
    editProduct: (req, res) =>{
        let productToEdit = products.find(element => element.id == req.params.id)
        res.render('./products/editProduct', {product: productToEdit})
    },
    upload: (req, res) =>{
        let parametro = req.params.id
        let productToEdit = products.find(element => element.id == parametro)
        let multerParam = req.file ? req.file.filename : undefined
        let filePrice = (req.body.price) * (req.body.passengers == "none" ? productToEdit.passengers : req.body.passengers)
        function priceCounter (num){
            if(num > 0){
                return num
            }
            else{
                return productToEdit.price
            }
        }
        let onsale = req.body.onSale || productToEdit.onSale
        function onSaleCounter(onsale) {      
            if (onsale == "true"){
                return true
            }
            else{
                return false
            }
        } 
        let editedInformation =  {
            id: parseInt(parametro),
            departure: req.body.departure,
            reach: req.body.reach,
            departureDate: req.body.dateDeparture || productToEdit.departureDate,
            returnDate: req.body.dateReach || productToEdit.returnDate,
            departureHour: req.body.hourDeparture || productToEdit.departureHour,
            returnHour: req.body.hourReach || productToEdit.returnHour,
            hotel: req.body.hotel,
            description: req.body.description,
            cabin: req.body.cabin == "none" ? productToEdit.cabin : req.body.cabin,
            service: req.body.service == "none" ? productToEdit.service : req.body.service,
            passengers: req.body.passengers == "none" ? productToEdit.passengers : req.body.passengers,
            onSale: onSaleCounter(onsale),
            price: priceCounter(filePrice),
            image: multerParam || productToEdit.image
		}
        let customedProducts = products.map(element =>{
            if(element.id != parametro){
                return element
            }
            else{
                return element = editedInformation
            }
        })
        fs.writeFileSync(productsFilePath, JSON.stringify(customedProducts))
		 res.redirect("/products")
    },

// Submit a new product
    submitProduct: (req, res) =>{
        res.render('./products/submitProduct')
    },
    store: (req, res)=>{
        let newProduct = {
            id: products.length + 1,
            departure: req.body.departure,
            reach: req.body.reach,
            departureDate: req.body.dateDeparture,
            returnDate: req.body.dateReach,
            departureHour: req.body.hourDeparture,
            returnHour: req.body.hourReach,
            hotel: req.body.hotel,
            description: req.body.description,
            cabin: req.body.cabin,
            service: req.body.service,
            passengers: req.body.passengers,
            onSale: req.body.onSale,
            price: (req.body.price) * (req.body.passengers),
            image: req.file.filename
		}
   
         products.push(newProduct)

		 fs.writeFileSync(productsFilePath, JSON.stringify(products))
		 
		 res.redirect("/products")
    },

// Show the complete product list
    productList: (req, res) => {
        res.render('./products/ProductList', {products: products})

    },

// Show the on sale product list
    onSale: (req, res) => {
        let onSale = products.filter(element => element.onSale == true)
        res.render('./products/onSale', {products: onSale})
    },

//Delete product
    deleteProduct:(req, res)=>{
        let dataFilter = products.filter(element => (element.id != req.params.id))
        dataFilter.map((element, index) => {
            element.id = index + 1 
        })
		fs.writeFileSync(productsFilePath, JSON.stringify(dataFilter))
		res.redirect('/products')
    }
}

module.exports = productsController