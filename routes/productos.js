const express = require("express");
const { Router } = express;
const router = new Router();
const requireAuth = require("../middleware/acceso.js");
const productoController = require("../controllers/productoController");

//api/productos
router.post("/agregar", requireAuth.esAdmin,productoController.crearProducto);

router.get("/listar", requireAuth.esAdmin, productoController.obtenerProductos);
router.put(
  "/actualizar/:id",
  requireAuth.esAdmin,
  productoController.actualizarProductos
);
router.get(
  "/listar/:id",
  requireAuth.esAdmin,
  productoController.obtenerProducto
);
router.delete(
  "/borrar/:id",
  requireAuth.esAdmin,
  productoController.eliminarProducto
);
module.exports = router;
