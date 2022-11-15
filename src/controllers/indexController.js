const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../dataBase/product.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const indexController = {
    index: (req, res) =>{
        let onSale = products.filter(element => element.onSale == true)
        res.render('index', {products: onSale})
    }
}
        
module.exports = indexController