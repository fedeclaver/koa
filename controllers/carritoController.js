const Contenedor = require("../models/Carrito");
const Carrito = new Contenedor("./models/carrito.txt");
const Productos = new Contenedor("./models/productos.txt");
var http = require("http");

exports.crearCarrito = async (req, res) => {
  try {
    let objeto = { productos: [] };
    objeto = Object.assign({ timestamp: Date.now() }, objeto);
    const idCarrito = await Carrito.save(objeto);
    if (idCarrito) {
      res
        .status(200)
        .json({ msg: `Carrito insertado correctamente id:${idCarrito}` });
    } else {
      res.status(500).json({ msg: "Error al crearCarrito" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al crearCarrito" });
  }
};

exports.agregarProducto = async (req, res) => {
  try {
    let producto = await Productos.getById(req.params.id_prod);
    if (!producto) {
      res.status(404).json({ msg: "Producto no encontrado" });
    }
    let carrito = await Carrito.agregarProducto(req.params.idCarrito, producto);
    if (carrito) {
      res
        .status(200)
        .json({ msg: `El Producto id:${carrito} se agregó correctamente` });
    } else {
      res.status(500).json({ msg: "Error al agregando el Producto" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error  al agregar Productos");
  }
};

exports.obtenerCarritos = async (req, res) => {
  try {
    let carritos = await Carrito.getAll();
    let data = JSON.parse(carritos);
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error obtenerCarritos");
  }
};

exports.obtenerCarrito = async (req, res) => {
  try {
    let carrito = await Carrito.getById(req.params.id);
    if (!carrito) {
      res.status(404).json({ msg: "Carrito no encontrado" });
    }
    res.json(carrito);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error obtenerCarrito");
  }
};

exports.eliminarCarrito = async (req, res) => {
  try {
    let carrito = await Producto.deleteById(req.params.id);
    if (!carrito) {
      res.status(404).json({ msg: "Carrito no encontrado" });
    } else {
      res.json({ msg: "Carrito eliminado correctamente" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error obtenerProductos");
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    let carrito = await Productos.getById(req.params.idCarrito);
    if (!carrito) {
      res.status(404).json({ msg: "Carrito no encontrado" });
    }
    let producto = await Carrito.eliminarProducto(
      req.params.idCarrito,
      req.params.id_prod
    );
    if (producto) {
      res.status(200).json({ msg: `El Producto se elimino correctamente` });
    } else {
      res.status(500).json({ msg: "Error al agregando el Producto" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error  al agregar Productos");
  }
};
