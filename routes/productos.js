const Router = require("koa-router");

const productoController = require("../controllers/productoController");
const {checkAuthentication} = require('../middleware/acceso');
const router = new Router();

router.get("/listar", productoController.obtenerProductos);
//api/productos

router.post("/agregar", checkAuthentication,productoController.crearProducto);


 router.put(
   "/actualizar/:id",
   checkAuthentication,
   productoController.actualizarProductos
 );
 router.get(
   "/listar/:id",
   checkAuthentication,
   productoController.obtenerProducto
 );
 router.delete(
   "/borrar/:id",
   checkAuthentication,
   productoController.eliminarProducto
);
module.exports = router;



