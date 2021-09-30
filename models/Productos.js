const fs = require("fs");

class Productos {
  constructor(nombrearchivo) {
    this.nombrearchivo = nombrearchivo;
    if (!fs.existsSync(this.nombrearchivo)) {
      fs.writeFileSync(this.nombrearchivo, JSON.stringify([]));
    }
  }
  //id, timestamp, nombre, descripcion, código, foto (url), precio, stock.

  async save(product) {
    if (
      product.nombre ||
      product.descripcion ||
      product.código ||
      product.foto ||
      product.stock
    ) {
      try {
        const contenido = await fs.promises.readFile(
          this.nombrearchivo,
          "utf-8"
        );
        let productos = JSON.parse(contenido);

        if (productos.length == 0) {
          product.id = 1;
        } else {
          let max = Math.max(...productos.map((e) => e.id));
          product.id = max + 1;
        }
        const newItem = {
          // Seteo algunos valores x default
          id: product.id,
          timestamp: Date.now(),
          nombre: product.nombre,
          descripcion: product.descripcion,
          codigo: product.codigo,
          foto: product.foto,
          precio: Number(product.precio),
          stock: Number(product.stock),
        };
        productos.push(newItem);
        fs.promises.writeFile(
          this.nombrearchivo,
          JSON.stringify(productos, null, 2)
        );
        return product.id;
      } catch (error) {
        console.log(`Error en lectura: ${error}`);
        throw new Error(`Error en lectura: ${error}`);
      }
    } else {
      throw new Error(`Error al insertar Productos campos requeridos`);
    }
  }

  async getById(numero) {
    try {
      const contenido = await fs.promises.readFile(this.nombrearchivo, "utf-8");
      let data = JSON.parse(contenido);
      // let numer = JSON.parse(numero);
      let resultado = data.find((e) => e.id == numero);
      if (numero) {
        return resultado;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error en lectura: ${error}`);
    }
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.nombrearchivo, "utf-8");
      return contenido;
    } catch (error) {
      throw new Error(`Error en lectura: ${error}`);
    }
  }

  async deleteById(numero) {
    try {
      const contenido = await fs.promises.readFile(this.nombrearchivo, "utf-8");
      if (contenido) {
        if (contenido.length > 0) {
          const data = JSON.parse(contenido);
          let existe = data.filter((e) => e.id == parseInt(numero));
          let resultado = data.filter((e) => e.id !== parseInt(numero));
          if (resultado) {
            fs.writeFile(
              this.nombrearchivo,
              JSON.stringify(resultado, null, 2),
              (error) => {
                if (error) {
                  throw new Error(`Error en escritura: ${error}`);
                }
                //console.log('info.txt: escritura exitosa')
              }
            );
            return existe;
          }
        }
      }
      return "";
    } catch (error) {
      throw new Error(`Error en lectura: ${error}`);
    }
  }

  async actualizar(elem, id) {
    if (
      elem.timestamp ||
      elem.nombre ||
      elem.descripcion ||
      elem.código ||
      elem.foto ||
      elem.precio ||
      elem.stock
    ) {
      elem.timestamp = Date.now();
      const contenido = await fs.promises.readFile(this.nombrearchivo, "utf-8");
      const data = JSON.parse(contenido);
      let resultado = data.findIndex((e) => e.id == parseInt(id));
      if (resultado == -1) {
        throw new Error(`Error al actualizar: no se encontró el id ${id}`);
      } else {
        data[resultado] = elem;
        try {
          await fs.writeFile(
            this.nombrearchivo,
            JSON.stringify(data, null, 2),
            function (error, result) {
              if (error) throw new Error(`Error al actualizar: ${error}`);
            }
          );
          return elem;
        } catch (error) {
          throw new Error(`Error al actualizar: ${error}`);
        }
      }
    } else {
      throw new Error(`Error en actualizacion campo requerido`);
    }
  }
  async deleteAll() {
    await fs.writeFile(this.nombrearchivo, "[]", (error) => {
      if (error) {
        throw new Error(`Error en escritura: ${error}`);
      }
      console.log("info.txt: escritura exitosa");
    });
  }

  async savefile(data) {
    try {
      const contenido = await fs.promises.writeFile(
        this.nombrearchivo,
        data,
        (error) => {
          if (error) {
            throw new Error(`Error en escritura: ${error}`);
          } else {
            console.log("JSON escritura exitosa");
          }
        }
      );
      return "ok";
    } catch (error) {
      throw new Error(`Error en escritura: ${error}`);
    }
  }
}

module.exports = Productos;

//const productos = new Contenedor('productos.txt');
//console.log(await productos.getAll());
