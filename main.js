
const express = require('express');

const Contenedor = require('./Contenedor');
const producto = new Contenedor('productos.txt');
const app = express();
//app.use(express.JSON);
const PORT = 8080

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))



app.get('/productos', (req, res) => {
  producto.getAll().then((contenido)=> {
    res.send(contenido)
  })

})


app.get('/productosget', (req, res) => {  
  producto.getById(req.query.id).then((contenido)=> {
    res.send(contenido);
  })
})

app.get('/deleteproductos', (req, res) => {
  producto.deleteById(req.query.id).then((contenido)=> {
    res.send(contenido)
  })
})

app.get('/productoRandm', (req, res) => {
  producto.getAll().then((contenido)=> {
    let cont = JSON.parse(contenido)
    let i = Math.floor(Math.random()*cont.length) 
     let c = cont.find( e=>e.id == (i + 1) )
    res.send(c)
  })
})

