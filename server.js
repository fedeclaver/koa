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
//const requireAuth = require("../middleware/acceso.js");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/productos", productosRouter);
app.use("/carritos", carritosRouter);
//app.use("/auth", authRouter);



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
   cookie: {
    maxAge: 60000
}
}));


app.get('/info', (req,res) => {
  console.log('------------ req.session -------------')
  console.log(req.session)
  console.log('--------------------------------------')

  console.log('----------- req.sessionID ------------')
  console.log(req.sessionID)
  console.log('--------------------------------------')

  console.log('----------- req.cookies ------------')
  console.log(req.cookies)
  console.log('--------------------------------------')

  console.log('---------- req.sessionStore ----------')
  console.log(req.sessionStore)
  console.log('--------------------------------------')

  if(req.session.contador) {
    req.session.contador++
    res.send(`Ud ha visitado el sitio ${req.session.contador} veces.`)
  }
  else {
    req.session.contador = 1
    res.send('Bienvenido! Send info ok!')
  }


 
})






app.get('/', (req, res) => {
  res.redirect('/index.html');
})


app.get('/logout', (req, res) => {
  const nombre = req.session.nombre
  if (nombre){
  req.session.destroy(err=>{
    if (!err) {
          
            res.json({ msg: `Hasta luego ${nombre}!`});
          
          } else {
            res.status(500);
            res.json({error: err});
          }
      }
  );
}else {
  res.json({ msg: `no hay session `});
}
});

app.post('/login', (req, res) => {
  const nombre = req.session?.nombre
  if (nombre) {
    res.json({ msg: `Te damos la bienvenida!`});
} else {
    req.session.nombre = req.body.username;
    res.json({ msg: `Bienvenido ${req.session.nombre}!`});
}
      
})


const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
 