const ContenedorFirebase = require('../../contenedores/ContenedorFirebase.js')
class CarritosDaoFirebase extends ContenedorFirebase {

    constructor() {
        super('carritos')
    }
}


module.exports = CarritosDaoFirebase;