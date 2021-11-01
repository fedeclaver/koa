let carritosDao;

require("dotenv").config({ path: "variables.env" });

switch (process.env.BASE) {
  case "mongodb":
    const CarritosDaoMongo = require("./CarritosDaoMongo.js");
    carritosDao = new CarritosDaoMongo();
    break;
  case "firebase":
    const CarritosDaoFirebase = require("./CarritosDaoFirebase.js");
    carritosDao = new CarritosDaoFirebase();
    break;
}

module.exports = carritosDao;
