const productosDao = require("../daos/productos/index.js");
const { loggerWarn, loggerTrace, loggerError } = require("../utils/log4js");

const crearProducto = async (ctx) => {
    loggerTrace.trace("Ingreso a crearProducto");

    const { nombre, descripcion, codigo, foto, precio, stock } = ctx.request.body;

    if (!nombre || !descripcion || !codigo || !stock) {
        loggerWarn.warn('Campos requeridos faltantes en creación de producto');
        ctx.status = 400;
        ctx.body = {
            status: "error",
            message: "Campos requeridos: nombre, descripcion, codigo, stock"
        };
        return;
    }

    const newItem = {
        timestamp: Date.now(),
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock
    };

    const producto = await productosDao.guardar(newItem);

    ctx.status = 201;
    ctx.body = {
        status: "ok",
        message: `Producto insertado correctamente`,
        id: producto.id
    };
}         

const obtenerProductos = async (ctx) => {
    loggerTrace.trace("Ingreso a obtenerProductos");
    const productos = await productosDao.getAll();
    ctx.body = productos;
}


const actualizarProductos = async (ctx) => {
    loggerTrace.trace("Ingreso a actualizarProductos");

    const { nombre, descripcion, codigo, foto, precio, stock } = ctx.request.body;
    let producto = await productosDao.getById(ctx.params.id);

    if (!producto) {
        ctx.status = 404;
        ctx.body = {
            status: "error",
            message: 'No existe el producto'
        };
        return;
    }

    producto.timestamp = Date.now();
    producto.nombre = nombre;
    producto.descripcion = descripcion;
    producto.codigo = codigo;
    producto.foto = foto;
    producto.precio = precio;
    producto.stock = stock;

    const productoActualizado = await productosDao.update(producto);

    ctx.status = 200;
    ctx.body = productoActualizado;
}


const obtenerProducto = async (ctx) => {
    loggerTrace.trace("Ingreso a obtenerProducto");

    const producto = await productosDao.getById(ctx.params.id);

    if (!producto) {
        ctx.status = 404;
        ctx.body = {
            status: "error",
            message: "No existe el producto"
        };
        return;
    }

    ctx.body = producto;
}

const eliminarProducto = async (ctx) => {
    loggerTrace.trace("Ingreso a eliminarProducto");

    const producto = await productosDao.getById(ctx.params.id);

    if (!producto) {
        ctx.status = 404;
        ctx.body = {
            status: "error",
            message: "Producto no encontrado"
        };
        return;
    }

    await productosDao.deleteById(ctx.params.id);

    ctx.status = 200;
    ctx.body = {
        status: "ok",
        message: "Producto eliminado con éxito"
    };
};

module.exports = {
    eliminarProducto,
    obtenerProducto,
    actualizarProductos,
    obtenerProductos,
    crearProducto
};