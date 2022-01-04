const express = require("express");
const { Router } = express;
const router = new Router();
const compraController = require("../controllers/compraController");
const {checkAuthentication} = require('../middleware/acceso');
const {esAdmin} = require('../middleware/acceso');



router.get("/agregar", esAdmin,checkAuthentication,  compraController.crearCompra);

router.get("/listar", esAdmin,checkAuthentication, compraController.obtenerCompras);

router.get("/listar/:id", esAdmin,checkAuthentication, compraController.obtenerCompra);


module.exports = router;
