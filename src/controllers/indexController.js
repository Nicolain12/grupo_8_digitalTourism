const fs = require('fs');
const path = require('path');

const db = require('../database/models')
const Package = db.Package

const indexController = {
    index: async (req, res) =>{
        
        const onSale = await Package.findAll()
        console.log('ON SALE:')
        console.log(onSale)

        // let carruselArrowLeft = function (id){
        // let carruselProduct = onSale.find(element => element.id == id)
        // let carruselProductIndex = onSale.indexOf(carruselProduct)
        //  if(carruselProduct){
        //     if(carruselProductIndex > 0){
        //         return onSale[carruselProductIndex - 1].id
        //     }else{
        //         let elseLeftProduct = onSale.length - 1
        //         return onSale[elseLeftProduct].id
        //     }
        //     }
        // }
        // let carruselArrowRight = function (id){
        //     let carruselProduct = onSale.find(element => element.id == id)
        //     let carruselProductIndex = onSale.indexOf(carruselProduct)
        //      if(carruselProduct){
        //         let lastsProduct = onSale.length - 1
        //         if(carruselProductIndex < lastsProduct){
        //             return onSale[carruselProductIndex + 1].id
        //         }
        //         if(carruselProductIndex = lastsProduct){
        //             return onSale[0].id
        //         }
        //         }
        // }

    return res.render('index')
    }
}
        
module.exports = indexController