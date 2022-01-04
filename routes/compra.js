const express = require("express");
const { Router } = express;
const router = new Router();
const comprasController = require("../controllers/comprasController");
const {checkAuthentication} = require('../middleware/acceso');
const {esAdmin} = require('../middleware/acceso');



router.get("/agregar", esAdmin,checkAuthentication,  comprasController.crearCompra);

router.get("/listar", esAdmin,checkAuthentication, comprasController.obtenerCompras);

router.get("/listar/:id", esAdmin,checkAuthentication, comprasController.obtenerCompra);


module.exports = router;
