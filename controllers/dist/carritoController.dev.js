"use strict";

var Contenedor = require("../models/Carrito");

var Carrito = new Contenedor("./models/carrito.txt");
var Productos = new Contenedor("./models/productos.txt");

var http = require("http");

exports.crearCarrito = function _callee(req, res) {
  var objeto, idCarrito;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          objeto = {
            productos: []
          };
          objeto = Object.assign({
            timestamp: Date.now()
          }, objeto);
          _context.next = 5;
          return regeneratorRuntime.awrap(Carrito.save(objeto));

        case 5:
          idCarrito = _context.sent;

          if (idCarrito) {
            res.status(200).json({
              msg: "Carrito insertado correctamente id:".concat(idCarrito)
            });
          } else {
            res.status(500).json({
              msg: "Error al crearCarrito"
            });
          }

          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            msg: "Error al crearCarrito"
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.agregarProducto = function _callee2(req, res) {
  var producto, carrito;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Productos.getById(req.params.id_prod));

        case 3:
          producto = _context2.sent;

          if (!producto) {
            res.status(404).json({
              msg: "Producto no encontrado"
            });
          }

          _context2.next = 7;
          return regeneratorRuntime.awrap(Carrito.agregarProducto(req.params.idCarrito, producto));

        case 7:
          carrito = _context2.sent;

          if (carrito) {
            res.status(200).json({
              msg: "El Producto id:".concat(carrito, " se agreg\xF3 correctamente")
            });
          } else {
            res.status(500).json({
              msg: "Error al agregando el Producto"
            });
          }

          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).send("Error  al agregar Productos");

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.obtenerCarritos = function _callee3(req, res) {
  var carritos, data;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Carrito.getAll());

        case 3:
          carritos = _context3.sent;
          data = JSON.parse(carritos);
          res.setHeader("Content-Type", "application/json");
          res.json(data);
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).json("Error obtenerCarritos");

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.obtenerCarrito = function _callee4(req, res) {
  var carrito;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Carrito.getById(req.params.id));

        case 3:
          carrito = _context4.sent;

          if (!carrito) {
            res.status(404).json({
              msg: "Carrito no encontrado"
            });
          }

          res.json(carrito);
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).send("Error obtenerCarrito");

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.eliminarCarrito = function _callee5(req, res) {
  var carrito;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Producto.deleteById(req.params.id));

        case 3:
          carrito = _context5.sent;

          if (!carrito) {
            res.status(404).json({
              msg: "Carrito no encontrado"
            });
          } else {
            res.json({
              msg: "Carrito eliminado correctamente"
            });
          }

          _context5.next = 11;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).send("Error obtenerProductos");

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};