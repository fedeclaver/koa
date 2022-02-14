const Router = require("koa-router");

const productoController = require("../controllers/productoController");
const router = new Router();

router
.get("/listar", productoController.obtenerProductos)
.post("/agregar", productoController.crearProducto)
.put("/actualizar/:id", productoController.actualizarProductos )
.get("/listar/:id", productoController.obtenerProducto )
.delete("/borrar/:id", productoController.eliminarProducto);

module.exports = router;



