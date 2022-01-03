const ContenedorFirebase = require('../../contenedores/ContenedorFirebase.js')
class ComprasDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('compras')
    }
}


module.exports = CarritosDaoFirebase;