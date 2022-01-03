let comprasDao;

require("dotenv").config({ path: "variables.env" });

switch (process.env.BASE) {
  case "mongodb":
    const ComprasDaoMongo = require("./ComprasDaoMongo.js");
    comprasDao = new ComprasDaoMongo();
    break;
  case "firebase":
    const ComprasDaoFirebase = require("./ComprasDaoFirebase.js");
    comprasDao = new ComprasDaoFirebase();
    break;
}

module.exports = comprasDao;
