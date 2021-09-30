"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CarritoMemoria =
/*#__PURE__*/
function () {
  function CarritoMemoria() {
    _classCallCheck(this, CarritoMemoria);

    this.array = [];
  }

  _createClass(CarritoMemoria, [{
    key: "save",
    value: function save(object) {
      var id, i;
      return regeneratorRuntime.async(function save$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              id = 0;

              for (i = 0; i < this.array.length; i++) {
                if (this.array[i].id > id) id = this.array[i].id;
              }

              id += 1;
              object = Object.assign({
                id: id
              }, object);
              this.array.push(object);
              return _context.abrupt("return", id);

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              console.log("error:", _context.t0);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[0, 9]]);
    }
  }, {
    key: "getById",
    value: function getById(number) {
      var i;
      return regeneratorRuntime.async(function getById$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              i = 0;

            case 2:
              if (!(i < this.array.length)) {
                _context2.next = 8;
                break;
              }

              if (!(this.array[i].id == number)) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return", this.array[i]);

            case 5:
              i++;
              _context2.next = 2;
              break;

            case 8:
              return _context2.abrupt("return", null);

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              console.log("error:", _context2.t0);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, [[0, 11]]);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return regeneratorRuntime.async(function getAll$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              return _context3.abrupt("return", this.array);

            case 4:
              _context3.prev = 4;
              _context3.t0 = _context3["catch"](0);
              console.log("error:", _context3.t0);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, [[0, 4]]);
    }
  }, {
    key: "deleteById",
    value: function deleteById(number) {
      var arrayNew, i;
      return regeneratorRuntime.async(function deleteById$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              //void - Elimina del archivo el objeto con el id buscado.
              try {
                arrayNew = [];

                for (i = 0; i < this.array.length; i++) {
                  if (this.array[i].id != number) arrayNew.push(this.array[i]);
                }

                this.array = arrayNew;
              } catch (err) {
                console.log("error:", err);
              }

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "deleteAll",
    value: function deleteAll() {
      return regeneratorRuntime.async(function deleteAll$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              //void - Elimina todos los objetos presentes en el archivo.
              try {
                this.array = [];
              } catch (err) {
                console.log("error:", err);
              }

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "update",
    value: function update(object) {
      var elemento, arrayNew, i;
      return regeneratorRuntime.async(function update$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              //void - Actualiza elemento según id.
              try {
                elemento = object; //Producto a actualizar

                arrayNew = []; //Nuevo array de array

                for (i = 0; i < this.array.length; i++) {
                  if (this.array[i].id != elemento.id) arrayNew.push(this.array[i]); //Si el id es distinto copio el elemento original
                  else arrayNew.push(elemento); //Si el id es igual actualizo el elemento
                }

                this.array = arrayNew;
              } catch (err) {
                console.log("error:", err);
              }

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }]);

  return CarritoMemoria;
}();

module.exports = ContenedorMemoria;