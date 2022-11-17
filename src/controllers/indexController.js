const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../dataBase/product.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const indexController = {
    index: (req, res) =>{
        let onSale = products.filter(element => element.onSale == true)
        let carruselArrowLeft = function (id){
        let carruselProduct = onSale.find(element => element.id == id)
        let carruselProductIndex = onSale.indexOf(carruselProduct)
         if(carruselProduct){
            if(carruselProductIndex > 0){
                return onSale[carruselProductIndex - 1].id
            }else{
                let elseLeftProduct = onSale.length - 1
                return onSale[elseLeftProduct].id
            }
            }
        }
        let carruselArrowRight = function (id){
            let carruselProduct = onSale.find(element => element.id == id)
            let carruselProductIndex = onSale.indexOf(carruselProduct)
             if(carruselProduct){
                let lastsProduct = onSale.length - 1
                if(carruselProductIndex < lastsProduct){
                    return onSale[carruselProductIndex + 1].id
                }
                if(carruselProductIndex = lastsProduct){
                    return onSale[0].id
                }
                }
            }
        res.render('index', {products: onSale, carruselArrowLeft: carruselArrowLeft, carruselArrowRight:carruselArrowRight})
    }
}
        
module.exports = indexController