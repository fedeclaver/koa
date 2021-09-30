"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fs = require("fs");

var Productos =
/*#__PURE__*/
function () {
  function Productos(nombrearchivo) {
    _classCallCheck(this, Productos);

    this.nombrearchivo = nombrearchivo;

    if (!fs.existsSync(this.nombrearchivo)) {
      fs.writeFileSync(this.nombrearchivo, JSON.stringify([]));
    }
  } //id, timestamp, nombre, descripcion, código, foto (url), precio, stock.


  _createClass(Productos, [{
    key: "save",
    value: function save(product) {
      var contenido, productos, max, newItem;
      return regeneratorRuntime.async(function save$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(product.nombre || product.descripcion || product.código || product.foto || product.stock)) {
                _context.next = 19;
                break;
              }

              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap(fs.promises.readFile(this.nombrearchivo, "utf-8"));

            case 4:
              contenido = _context.sent;
              productos = JSON.parse(contenido);

              if (productos.length == 0) {
                product.id = 1;
              } else {
                max = Math.max.apply(Math, _toConsumableArray(productos.map(function (e) {
                  return e.id;
                })));
                product.id = max + 1;
              }

              newItem = {
                // Seteo algunos valores x default
                id: product.id,
                timestamp: Date.now(),
                nombre: product.nombre,
                descripcion: product.descripcion,
                codigo: product.codigo,
                foto: product.foto,
                precio: Number(product.precio),
                stock: Number(product.stock)
              };
              productos.push(newItem);
              fs.promises.writeFile(this.nombrearchivo, JSON.stringify(productos, null, 2));
              return _context.abrupt("return", product.id);

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](1);
              console.log("Error en lectura: ".concat(_context.t0));
              throw new Error("Error en lectura: ".concat(_context.t0));

            case 17:
              _context.next = 20;
              break;

            case 19:
              throw new Error("Error al insertar Productos campos requeridos");

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[1, 13]]);
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
      var contenido, data, existe, resultado;
      return regeneratorRuntime.async(function deleteById$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return regeneratorRuntime.awrap(fs.promises.readFile(this.nombrearchivo, "utf-8"));

            case 3:
              contenido = _context4.sent;

              if (!contenido) {
                _context4.next = 12;
                break;
              }

              if (!(contenido.length > 0)) {
                _context4.next = 12;
                break;
              }

              data = JSON.parse(contenido);
              existe = data.filter(function (e) {
                return e.id == parseInt(numero);
              });
              resultado = data.filter(function (e) {
                return e.id !== parseInt(numero);
              });

              if (!resultado) {
                _context4.next = 12;
                break;
              }

              fs.writeFile(this.nombrearchivo, JSON.stringify(resultado, null, 2), function (error) {
                if (error) {
                  throw new Error("Error en escritura: ".concat(error));
                } //console.log('info.txt: escritura exitosa')

              });
              return _context4.abrupt("return", existe);

            case 12:
              return _context4.abrupt("return", "");

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](0);
              throw new Error("Error en lectura: ".concat(_context4.t0));

            case 18:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[0, 15]]);
    }
  }, {
    key: "actualizar",
    value: function actualizar(elem, id) {
      var contenido, data, resultado;
      return regeneratorRuntime.async(function actualizar$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(elem.timestamp || elem.nombre || elem.descripcion || elem.código || elem.foto || elem.precio || elem.stock)) {
                _context5.next = 23;
                break;
              }

              elem.timestamp = Date.now();
              _context5.next = 4;
              return regeneratorRuntime.awrap(fs.promises.readFile(this.nombrearchivo, "utf-8"));

            case 4:
              contenido = _context5.sent;
              data = JSON.parse(contenido);
              resultado = data.findIndex(function (e) {
                return e.id == parseInt(id);
              });

              if (!(resultado == -1)) {
                _context5.next = 11;
                break;
              }

              throw new Error("Error al actualizar: no se encontr\xF3 el id ".concat(id));

            case 11:
              data[resultado] = elem;
              _context5.prev = 12;
              _context5.next = 15;
              return regeneratorRuntime.awrap(fs.writeFile(this.nombrearchivo, JSON.stringify(data, null, 2), function (error, result) {
                if (error) throw new Error("Error al actualizar: ".concat(error));
              }));

            case 15:
              return _context5.abrupt("return", elem);

            case 18:
              _context5.prev = 18;
              _context5.t0 = _context5["catch"](12);
              throw new Error("Error al actualizar: ".concat(_context5.t0));

            case 21:
              _context5.next = 24;
              break;

            case 23:
              throw new Error("Error en actualizacion campo requerido");

            case 24:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[12, 18]]);
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

  return Productos;
}();

module.exports = Productos; //const productos = new Contenedor('productos.txt');
//console.log(await productos.getAll());