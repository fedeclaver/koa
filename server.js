const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const Conexion = require('./config/config.js');
const productosRouter = require("./routes/productos.js");
const carritosRouter = require("./routes/carritos.js");
const authRouter = require("./routes/auth.js");
const app = express();
PORT = process.env.PORT | 8080;
const Cache = require('node-cache');
const cache = new Cache()


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/productos", productosRouter);
app.use("/carritos", carritosRouter);
app.use("/auth", authRouter);



app.set('view engine', 'ejs');

app.use(session({
  secret: 'secreto',
  resave: true,
  saveUninitialized: true
}));

app.use(session({
   store: MongoStore.create({ mongoUrl: Conexion.mongodb.cnxStr }),
   secret: 'secreto',
   resave: false,
   saveUninitialized: false,
}));



const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
 