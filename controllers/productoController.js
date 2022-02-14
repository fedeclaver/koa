

const productosDao = require("../daos/productos/index.js");
const {loggerWarn,loggerTrace,loggerDefault,loggerError} = require("../utils/log4js");



const crearProducto = async (ctx, next)  => {
    loggerTrace.trace("Ingreso a crearProducto");
    try {   
        if (ctx.request.body.nombre || ctx.request.body.descripcion || ctx.request.body.código || ctx.request.body.foto || ctx.request.body.stock
            ) {
                const newItem = {           
                    timestamp: Date.now(),
                    nombre: ctx.request.body.nombre,
                    descripcion: ctx.request.body.descripcion,
                    codigo: ctx.request.body.codigo,
                    foto: ctx.request.body.foto,
                    precio: ctx.request.body.precio,
                    stock: ctx.request.body.stock
                };
    
                // Creamos nuestro producto
                producto = productosDao.guardar(newItem);
    
                if (producto) {
                    ctx.response.status = (200);
                    ctx.body = {
                        status: "ok",
                        message: `Producto insertado correctamente id:${producto.id}`,
                      };   
                      
                } else {
                    ctx.response.status = (500);
                    ctx.body = {
                        status: "error",
                        message: "Error al crearProducto",
                      };                   
                }
    
            } else {
             
                loggerWarn.warn(
                    `El usuario no ingresó un campo de Producto requerido .`
                  );
                    throw new Error(`Error al insertar Productos campos requeridos`);
             
            }
    
        } catch (error) {     
            loggerError.error(error);
            ctx.throw(500, error);
        }
    }         

const obtenerProductos =  async(ctx, next)  => {
    loggerTrace.trace("Ingreso a obtenerProductos");
    try {
              const productos = await productosDao.getAll();
              ctx.body = productos;           
        
    } catch (error) {
        loggerError.error(error);
        console.log(error);
        ctx.throw(500, error);
    }

}


const actualizarProductos = async (ctx, next)=> {
    loggerTrace.trace("Ingreso a actualizarProductos");
    try {
        const { nombre, descripcion, codigo, foto, precio, stock } = ctx.request.body;
        let producto = await productosDao.getById(ctx.params.id);

        if (!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
        producto.timestamp = Date.now();
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.codigo = codigo;
        producto.foto = foto;
        producto.precio = precio;
        producto.stock = stock;
        producto = await productosDao.update(producto)
        ctx.response.status = 201;
        ctx.json(producto);

    } catch (error) {
        loggerError.error(error);
        ctx.throw(500, error);
    }
}


const obtenerProducto = async (ctx, next) => {
    loggerTrace.trace("Ingreso a obtenerProducto");
    try {
        let producto = await productosDao.getById(ctx.params.id);

        if (!producto) {
            ctx.body = {
                status: "error",
                message: "No existe el producto",
              };   
            ctx.response.status = (404)
        }else{
            ctx.body = producto;
        }

        

    } catch (error) {
        loggerError.error(error);
        ctx.throw(500, error);
    }
}

const eliminarProducto = async (ctx, next) => {
    loggerTrace.trace("Ingreso a eliminarProducto");
    try {      
        let producto = await productosDao.getById(ctx.params.id);

        if (!producto) {
            ctx.response.status = (500);
                    ctx.body = {
                        status: "error",
                        message: "Error al eliminar Producto",
                      };     
        }

        await productosDao.deleteById(ctx.params.id)
        ctx.response.status = (200);
        ctx.body = {
            status: "ok",
            message: "Producto Eliminado con éxito",
          };     
    } catch (error) {
        loggerError.error(error);
        ctx.throw(500, error);
    }
}

module.exports = {eliminarProducto,obtenerProducto,actualizarProductos,obtenerProductos,crearProducto};