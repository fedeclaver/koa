let usuariosDao;

require("dotenv").config({ path: "variables.env" });

switch (process.env.BASE) {
  case "mongodb":
    const UsuariosDaoMongo = require("./UsuariosDaoMongo.js");
    usuariosDao = new UsuariosDaoMongo();
    break;
  case "firebase":
    const UsuariosDaoFirebase = require("./UsuariosDaoFirebase.js");
    usuariosDao = new UsuariosDaoFirebase();
    break;
}

module.exports = usuariosDao;
