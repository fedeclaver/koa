const Contenedor = require("../models/Productos");
const Producto = new Contenedor("./models/productos.txt");

var http = require("http");

exports.crearProducto = async (req, res) => {
  try {
    let idproducto = await Producto.save(req.body);
    if (idproducto) {
      res
        .status(200)
        .redirect("/producto.html")
        .json({ msg: `Producto insertado correctamente id:${idproducto}` });
    } else {
      res.status(500).json({ msg: "Error al crearProducto" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error al crearProducto" });
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    let productos = await Producto.getAll();
    let data = JSON.parse(productos);
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error obtenerProductos");
  }
};
exports.actualizarProductos = async (req, res) => {
  try {
    let productos = await Producto.actualizar(req.body, req.params.id);
    if (productos) {
      res.status(200).json({ msg: `Producto actualizado correctamente` });
    } else {
      res.status(500).json({ msg: "Error al actualizado Producto" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Actualizar Productos");
  }
};

exports.obtenerProducto = async (req, res) => {
  try {
    let producto = await Producto.getById(req.params.id);
    if (!producto) {
      res.status(404).json({ msg: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error obtenerProductos");
  }
};

exports.eliminarProducto = async (req, res) => {
  try {
    let producto = await Producto.deleteById(req.params.id);
    if (producto == "") {
      res.status(404).json({ msg: "Producto no encontrado" });
    } else {
      res.json({ msg: "Producto eliminado correctamente" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error obtenerProductos");
  }
};
