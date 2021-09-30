const express = require("express");

const app = express();
PORT = process.env.PORT | 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/productos", require("./routes/productos"));
app.use("/carritos", require("./routes/carritos"));
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
