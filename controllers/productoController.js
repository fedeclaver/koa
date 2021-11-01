

const productosDao = require("../daos/productos/index.js");

exports.crearProducto = async (req, res) => {

    try {
        let producto;
        console.log(req.body)
        // Creamos nuestro producto
        producto = productosDao.save(req.body);       
       
        if (producto) {
          res
            .status(200)
            .redirect("/producto.html")
            .json({ msg: `Producto insertado correctamente id:${producto.id}` });
        } else {
          res.status(500).json({ msg: "Error al crearProducto" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProductos = async (req, res) => {

    try {

        const productos = await productosDao.getAll();
        res.json(productos)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarProductos = async (req, res) => {

    try {
        const { nombre, descripcion, codigo,foto,precio, stock } = req.body;
        let producto = await productosDao.getById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
        producto.timestamp=Date.now();
        producto.nombre = nombre;
        producto.descripcion = descripcion;        
        producto.codigo = codigo;        
        producto.foto = foto;
        producto.precio = precio;
        producto.stock =stock;
        producto = await productosDao.update(producto)
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.obtenerProducto = async (req, res) => {

    try {
        let producto = await productosDao.getById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
       
        res.json(producto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarProducto = async (req, res) => {

    try {
        let producto = await productosDao.getById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
       
        await productosDao.deleteById({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado con exito' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}