"use strict";

var express = require("express");

var Router = express.Router;
var router = new Router();

var requireAuth = require("../middleware/auth");

var carritoController = require("../controllers/carritoController");

router.post("/agregar", requireAuth.esAdmin, carritoController.crearCarrito);
router.get("/listar", requireAuth.esAdmin, carritoController.obtenerCarritos);
router.get("/listar/:id", requireAuth.esAdmin, carritoController.obtenerCarrito);
router.get("/agregarProducto/:idCarrito/:id_prod", requireAuth.esAdmin, carritoController.agregarProducto);
router.get("/eliminarProducto/:idCarrito/:id_prod", requireAuth.esAdmin, carritoController.eliminarProducto);
router["delete"]("/borrar/:id", requireAuth.esAdmin, carritoController.eliminarCarrito);
module.exports = router;