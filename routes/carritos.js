const express = require("express");
const { Router } = express;
const router = new Router();
const requireAuth = require("../middleware/auth");
const carritoController = require("../controllers/carritoController");

router.post("/agregar", requireAuth.esAdmin, carritoController.crearCarrito);

router.get("/listar", requireAuth.esAdmin, carritoController.obtenerCarritos);

router.get(
  "/listar/:id",
  requireAuth.esAdmin,
  carritoController.obtenerCarrito
);

router.get(
  "/agregarProducto/:idCarrito/:id_prod",
  requireAuth.esAdmin,
  carritoController.agregarProducto
);

router.get(
  "/eliminarProducto/:idCarrito/:id_prod",
  requireAuth.esAdmin,
  carritoController.eliminarProducto
);

router.delete(
  "/borrar/:id",
  requireAuth.esAdmin,
  carritoController.eliminarCarrito
);
module.exports = router;
