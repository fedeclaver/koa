const fs = require("fs");

class Carrito {
  constructor(nombrearchivo) {
    this.nombrearchivo = nombrearchivo;
    if (!fs.existsSync(this.nombrearchivo)) {
      fs.writeFileSync(this.nombrearchivo, JSON.stringify([]));
    }
  }

  async save(obj) {
    if (obj.timestamp || obj.producto) {
      try {
        const contenido = await fs.promises.readFile(
          this.nombrearchivo,
          "utf-8"
        );
        let carritos = JSON.parse(contenido);
        if (carritos.length == 0) {
          obj.id = 1;
          carritos.push(obj);
        } else {
          let max = Math.max(...carritos.map((e) => e.id));
          obj.id = max + 1;
          carritos.push(obj);
        }
        fs.promises.writeFile(this.nombrearchivo, JSON.stringify(carritos));
        return carritos.id;
      } catch (error) {
        console.log(`Error en lectura: ${error}`);
        res.status(500).send("Error insertarProductos");
      }
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
      const data = JSON.parse(contenido);
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
        return resultado;
      } else {
        // console.log(resultado);
        return null;
      }
    } catch (error) {
      throw new Error(`Error en lectura: ${error}`);
    }
  }
  async agregarProducto(idCarrito, prod) {
    const contenido = await fs.promises.readFile(this.nombrearchivo, "utf-8");
    const data = JSON.parse(contenido);
    let bandera = 0;
    for (var i = 0; i < data.length; i++) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == idCarrito) {
          bandera = 1;
          data[i].productos.push(prod);
        }
      }
    }
    if (bandera == 0) {
      throw new Error(
        `Error al eliminar Producto: no se encontró el id ${prod}`
      );
    } else {
      try {
        await fs.writeFile(
          this.nombrearchivo,
          JSON.stringify(data, null, 2),
          function (error, result) {
            if (error) throw new Error(`Error al actualizar: ${error}`);
          }
        );
        return idCarrito;
      } catch (error) {
        throw new Error(`Error al actualizar: ${error}`);
      }
    }
  }

  async eliminarProducto(idCarrito, prod) {
    const contenido = await fs.promises.readFile(this.nombrearchivo, "utf-8");
    const data = JSON.parse(contenido);
    let bandera = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i].id == idCarrito) {
        bandera = 1;
        let resultado = data[i].productos.filter(
          (e) => e.id !== parseInt(prod)
        );
        data[i].productos = resultado;
      }
    }
    if (bandera == 0) {
      throw new Error(`Error al actualizar: no se encontró el id ${idCarrito}`);
    } else {
      try {
        await fs.writeFile(
          this.nombrearchivo,
          JSON.stringify(data, null, 2),
          function (error, result) {
            if (error) throw new Error(`Error al actualizar: ${error}`);
          }
        );
        return prod;
      } catch (error) {
        throw new Error(`Error al actualizar: ${error}`);
      }
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

module.exports = Carrito;

//const productos = new Contenedor('productos.txt');
//console.log(await productos.getAll());
