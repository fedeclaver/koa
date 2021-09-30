"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fs = require("fs");

var Carrito =
/*#__PURE__*/
function () {
  function Carrito(nombrearchivo) {
    _classCallCheck(this, Carrito);

    this.nombrearchivo = nombrearchivo;

    if (!fs.existsSync(this.nombrearchivo)) {
      fs.writeFileSync(this.nombrearchivo, JSON.stringify([]));
    }
  }

  _createClass(Carrito, [{
    key: "save",
    value: function save(obj) {
      var contenido, carritos, max;
      return regeneratorRuntime.async(function save$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(obj.timestamp || obj.producto)) {
                _context.next = 15;
                break;
              }

              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap(fs.promises.readFile(this.nombrearchivo, "utf-8"));

            case 4:
              contenido = _context.sent;
              carritos = JSON.parse(contenido);

              if (carritos.length == 0) {
                obj.id = 1;
                carritos.push(obj);
              } else {
                max = Math.max.apply(Math, _toConsumableArray(carritos.map(function (e) {
                  return e.id;
                })));
                obj.id = max + 1;
                carritos.push(obj);
              }

              fs.promises.writeFile(this.nombrearchivo, JSON.stringify(carritos));
              return _context.abrupt("return", carritos.id);

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](1);
              console.log("Error en lectura: ".concat(_context.t0));
              res.status(500).send("Error insertarProductos");

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[1, 11]]);
    }
  }, {
    key: "getById",
    value: function getById(numero) {
      var contenido, data, resultado;
      return regeneratorRuntime.async(function getById$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(fs.promises.readFile(this.nombrearchivo, "utf-8"));

            case 3:
              contenido = _context2.sent;
              data = JSON.parse(contenido); // let numer = JSON.parse(numero);

              resultado = data.find(function (e) {
                return e.id == numero;
              });

              if (!numero) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt("return", resultado);

            case 10:
              return _context2.abrupt("return", null);

            case 11:
              _context2.next = 16;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2["catch"](0);
              throw new Error("Error en lectura: ".concat(_context2.t0));

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[0, 13]]);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      var contenido;
      return regeneratorRuntime.async(function getAll$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return regeneratorRuntime.awrap(fs.promises.readFile(this.nombrearchivo, "utf-8"));

            case 3:
              contenido = _context3.sent;
              return _context3.abrupt("return", contenido);

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              throw new Error("Error en lectura: ".concat(_context3.t0));

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[0, 7]]);
    }
  }, {
    key: "deleteById",
    value: function deleteById(numero) {
      var contenido, data, resultado;
      return regeneratorRuntime.async(function deleteById$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return regeneratorRuntime.awrap(fs.promises.readFile(this.nombrearchivo, "utf-8"));

            case 3:
              contenido = _context4.sent;
              data = JSON.parse(contenido);
              resultado = data.filter(function (e) {
                return e.id !== parseInt(numero);
              });

              if (!resultado) {
                _context4.next = 11;
                break;
              }

              fs.writeFile(this.nombrearchivo, JSON.stringify(resultado, null, 2), function (error) {
                if (error) {
                  throw new Error("Error en escritura: ".concat(error));
                } //console.log('info.txt: escritura exitosa')

              });
              return _context4.abrupt("return", resultado);

            case 11:
              return _context4.abrupt("return", null);

            case 12:
              _context4.next = 17;
              break;

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4["catch"](0);
              throw new Error("Error en lectura: ".concat(_context4.t0));

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[0, 14]]);
    }
  }, {
    key: "agregarProducto",
    value: function agregarProducto(idCarrito, prod) {
      var contenido, data, bandera, i;
      return regeneratorRuntime.async(function agregarProducto$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(fs.promises.readFile(this.nombrearchivo, "utf-8"));

            case 2:
              contenido = _context5.sent;
              data = JSON.parse(contenido);
              bandera = 0;

              for (i = 0; i < data.length; i++) {
                if (data[i].id == idCarrito) {
                  bandera = 1;
                  data[i].productos.push(prod);
                }
              }

              if (!(bandera == 0)) {
                _context5.next = 10;
                break;
              }

              throw new Error("Error al actualizar: no se encontr\xF3 el id ".concat(idCarrito));

            case 10:
              _context5.prev = 10;
              _context5.next = 13;
              return regeneratorRuntime.awrap(fs.writeFile(this.nombrearchivo, JSON.stringify(data, null, 2), function (error, result) {
                if (error) throw new Error("Error al actualizar: ".concat(error));
              }));

            case 13:
              return _context5.abrupt("return", prod.id);

            case 16:
              _context5.prev = 16;
              _context5.t0 = _context5["catch"](10);
              throw new Error("Error al actualizar: ".concat(_context5.t0));

            case 19:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[10, 16]]);
    }
  }, {
    key: "deleteAll",
    value: function deleteAll() {
      return regeneratorRuntime.async(function deleteAll$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(fs.writeFile(this.nombrearchivo, "[]", function (error) {
                if (error) {
                  throw new Error("Error en escritura: ".concat(error));
                }

                console.log("info.txt: escritura exitosa");
              }));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "savefile",
    value: function savefile(data) {
      var contenido;
      return regeneratorRuntime.async(function savefile$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return regeneratorRuntime.awrap(fs.promises.writeFile(this.nombrearchivo, data, function (error) {
                if (error) {
                  throw new Error("Error en escritura: ".concat(error));
                } else {
                  console.log("JSON escritura exitosa");
                }
              }));

            case 3:
              contenido = _context7.sent;
              return _context7.abrupt("return", "ok");

            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              throw new Error("Error en escritura: ".concat(_context7.t0));

            case 10:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this, [[0, 7]]);
    }
  }]);

  return Carrito;
}();

module.exports = Carrito; //const productos = new Contenedor('productos.txt');
//console.log(await productos.getAll());