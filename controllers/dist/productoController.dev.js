"use strict";

var Contenedor = require("../models/Productos");

var Producto = new Contenedor("./models/productos.txt");

var http = require("http");

exports.crearProducto = function _callee(req, res) {
  var idproducto;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Producto.save(req.body));

        case 3:
          idproducto = _context.sent;

          if (idproducto) {
            res.status(200).redirect("/producto.html").json({
              msg: "Producto insertado correctamente id:".concat(idproducto)
            });
          } else {
            res.status(500).json({
              msg: "Error al crearProducto"
            });
          }

          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            msg: "Error al crearProducto"
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.obtenerProductos = function _callee2(req, res) {
  var productos, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Producto.getAll());

        case 3:
          productos = _context2.sent;
          data = JSON.parse(productos);
          res.setHeader("Content-Type", "application/json");
          res.json(data);
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          res.status(500).json("Error obtenerProductos");

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.actualizarProductos = function _callee3(req, res) {
  var productos;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Producto.actualizar(req.body, req.params.id));

        case 3:
          productos = _context3.sent;

          if (productos) {
            res.status(200).json({
              msg: "Producto actualizado correctamente"
            });
          } else {
            res.status(500).json({
              msg: "Error al actualizado Producto"
            });
          }

          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).send("Error Actualizar Productos");

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.obtenerProducto = function _callee4(req, res) {
  var producto;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(Producto.getById(req.params.id));

        case 3:
          producto = _context4.sent;

          if (!producto) {
            res.status(404).json({
              msg: "Producto no encontrado"
            });
          }

          res.json(producto);
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          res.status(500).send("Error obtenerProductos");

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.eliminarProducto = function _callee5(req, res) {
  var producto;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Producto.deleteById(req.params.id));

        case 3:
          producto = _context5.sent;

          if (producto == "") {
            res.status(404).json({
              msg: "Producto no encontrado"
            });
          } else {
            res.json({
              msg: "Producto eliminado correctamente"
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