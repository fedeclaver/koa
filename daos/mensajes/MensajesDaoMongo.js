const ContenedorMongo = require("../../contenedores/ContenedorMongo.js");

class MensajesDaoMongo extends ContenedorMongo {
  constructor() {
    super("mensajes", {
      author: {
      email: {
        type: String,
        required: true,
      },
      nombre: {
        type: String,
        required: true,
      },
      apellido: {
        type: String,
        required: true,
      },
      edad: {
        type: Number,
        required: true,
      },
      alias: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: true,
      },
    },
    text: {type: String, 
      required: true},
    fyh: {type: Date, 
      default: Date.now}
    });
  }
}

module.exports = MensajesDaoMongo;
