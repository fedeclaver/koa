

const Contenedor = require('../models/Contenedor');
const Producto = new Contenedor('./models/productos.txt');
var http = require('http');
exports.crearProducto = async(req,res) => {
    try {
        let idproducto= await Producto.save(req.body);   
        if (idproducto){
            res.status(200).json({msg:`Producto insertado correctamente id:${idproducto}`})
        } else {
            res.status(500).json({msg:'Error al crearProducto'});
        }             
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'Error al crearProducto'});
    }
   
}


exports.obtenerProductos = async(req,res) => {
    try {
       let productos = await Producto.getAll();  
       let data = JSON.parse(productos);  
       res.setHeader('Content-Type', 'application/json');   
       res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json('Error obtenerProductos');
    }
   
}
exports.actualizarProductos = async(req,res) => {
    try {
       let {title, thumbnail, category, price} = req.body;
       let productos = await Producto.getAll();
       let data = JSON.parse(productos);  
       if(!data){
        res.status(404).json({msg:'No hay productos para acualizar'});
       }    
      
       for (var i = 0; i < data.length; ++i) {
        if (data[i]['id'] == req.params.id) {
            data[i]['title'] = title;
            data[i]['thumbnail'] =thumbnail;
            data[i]['category'] =category;    
            data[i]['price'] =price;
        }
    }
    let escribe = await Producto.savefile(JSON.stringify(data));
    if (escribe){
        res.status(200).json({msg:'acualizado existosamente'});
    }else {
        res.status(404).json({msg:'error al acualizar producto'});
    }
    } catch (error) {
        console.log(error)
        res.status(500).send('Error obtenerProductos');
    }
   
}

exports.obtenerProducto = async(req,res) => {
    try {
  
          let producto = await Producto.getById(req.params.id);
       if(!producto){
        res.status(404).json({msg:'Producto no encontrado'});
       }
           res.json(producto);
    } catch (error) {
        console.log(error)
        res.status(500).send('Error obtenerProductos');
    }
   
}


exports.eliminarProducto = async(req,res) => {
    try {
          let producto = await Producto.deleteById(req.params.id);
       if(!producto){
        res.status(404).json({msg:'Producto no encontrado'});
       } else {
        res.json({msg : 'Producto eliminado correctamente'});
       }      
       
    } catch (error) {
        console.log(error)
        res.status(500).send('Error obtenerProductos');
    }
   
}