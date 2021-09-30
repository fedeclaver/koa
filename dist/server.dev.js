"use strict";

var express = require("express");

var app = express();
PORT = process.env.PORT | 8080;
app.use(express["static"]("public"));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use("/productos", require("./routes/productos"));
app.use("/carritos", require("./routes/carritos"));
var server = app.listen(PORT, function () {
  console.log("Servidor http escuchando en el puerto ".concat(server.address().port));
});
server.on("error", function (error) {
  return console.log("Error en servidor ".concat(error));
});