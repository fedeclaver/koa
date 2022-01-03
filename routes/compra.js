const express = require("express");
const { Router } = express;
const router = new Router();
//const requireAuth = require("../middleware/acceso.js");
const compraController = require("../controllers/compraController");
const {checkAuthentication} = require('../middleware/acceso');
const {esAdmin} = require('../middleware/acceso');


router.get("/agregar", esAdmin,checkAuthentication,  compraController.crearCompra);

router.get("/listar", esAdmin,checkAuthentication, compraController.obtenerCarritos);

router.get("/listar/:id", esAdmin,checkAuthentication, compraController.obtenerCarrito);




module.exports = router;
