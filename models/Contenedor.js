const fs = require('fs')



class Contenedor {

  constructor(nombrearchivo) {
    this.nombrearchivo = nombrearchivo
    if (!fs.existsSync(this.nombrearchivo)) {
      fs.writeFileSync(this.nombrearchivo, JSON.stringify([]))
    }
  }




  async save(product) {
    if (product.title || product.price || product.thumbnail) {
      try {
        const contenido = await fs.promises.readFile(this.nombrearchivo, 'utf-8');
        let productos = JSON.parse(contenido);
        if (productos.length == 0) {
          console.log(JSON.stringify(product))
          product.id = 1
          console.log(product);
          productos.push(product);
        } else {
          let max = Math.max(...productos.map(e => e.id));
          product.id = max + 1;
          productos.push(product);
        }
        fs.promises.writeFile(this.nombrearchivo, JSON.stringify(productos))
        return product.id
      } catch (error) {
        console.log(`Error en lectura: ${error}`);
        res.status(500).send('Error insertarProductos');
      }
    }

  }


  async getById(numero) {
    try {
      const contenido = await fs.promises.readFile(this.nombrearchivo, 'utf-8');
      let data = JSON.parse(contenido);
      // let numer = JSON.parse(numero);
      let resultado = data.find(e => e.id == numero);
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
      const contenido = await fs.promises.readFile(this.nombrearchivo, 'utf-8');
      return contenido

    } catch (error) {
      throw new Error(`Error en lectura: ${error}`);
    }
  }



  async deleteById(numero) {
    try {
      const contenido = await fs.promises.readFile(this.nombrearchivo, 'utf-8');
      const data = JSON.parse(contenido);
      let resultado = data.filter(e => e.id !== parseInt(numero));
      if (resultado) {
        fs.writeFile(this.nombrearchivo, JSON.stringify(resultado, null, 2), error => {
          if (error) {
            throw new Error(`Error en escritura: ${error}`)
          }
          //console.log('info.txt: escritura exitosa')
        })
        return resultado;
      } else {
        // console.log(resultado);
        return null;
      }


    } catch (error) {
      throw new Error(`Error en lectura: ${error}`);
    }


  }
  async update(numero) {
    await fs.writeFile(this.nombrearchivo, '[]', error => {
      if (error) {
        throw new Error(`Error en escritura: ${error}`)
      }
      console.log('info.txt: escritura exitosa')
    }

    )
  }

  async deleteAll() {
    await fs.writeFile(this.nombrearchivo, '[]', error => {
      if (error) {
        throw new Error(`Error en escritura: ${error}`)
      }
      console.log('info.txt: escritura exitosa')
    }

    )
  }

  async savefile(data) {
    try {
      const contenido = await fs.promises.writeFile(this.nombrearchivo, data, error => {
        if (error) {
          throw new Error(`Error en escritura: ${error}`)
        } else {
            console.log("JSON escritura exitosa");
        }
    })
    return 'ok';    
    } catch (error) {
      throw new Error(`Error en escritura: ${error}`);
    }
  }

}

module.exports = Contenedor;

//const productos = new Contenedor('productos.txt');
//console.log(await productos.getAll());




