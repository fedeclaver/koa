
const express = require("express");
const http = require("http");
const {mongodb} = require("./config/config.js");
//librerias implementación de cluster
const cluster = require('cluster');
const numCPUs = require("os").cpus().length;
//const express = require('express');
const app = express();
const httpServer = http.createServer(app);
//cost socket

const { Server: Socket } = require('socket.io')


const io = new Socket(httpServer)

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
//logger
const { loggerTrace,loggerInfo, loggerWarn, loggerError } = require('./utils/log4js.js');

const productosRouter = require('./routes/productos');

const loginRouter = require('./routes/login');



const passport = require('passport');


const {checkAuthentication} = require('./middleware/acceso');




 // Middlewares
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 app.use(cookieParser());
 app.use(session({
     store: MongoStore.create({
         mongoUrl: mongodb.cnxStr,
         mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
     }),
     secret: 'secreto',
     cookie: {
         httpOnly: false,
         secure: false,
         maxAge: 600000
     },
     rolling: true,
     resave: true,
     saveUninitialized: false
 }));
 app.use(passport.initialize());
 app.use(passport.session());


 app.get('/getUser', checkAuthentication, (req, res) => {
     try {
         res.json(req.user ?? { status: 'Usuario no logueado.'})
     } catch (error) {
         loggerWarn.warn(error.message);
     }
 });

app.use('/auth', loginRouter)
app.use("/productos", productosRouter);




// SOCKETS 
const webSocket = require('./services/sockets');
const onConnection = (socket) => {
    webSocket(io, socket);
}
io.on('connection', onConnection);


//Error de app
app.use((err, req, res, next) => {
console.error(err.message);
return res.status(500).send("Se rompió todo");
});

app.use(express.static(process.cwd() + '/public'));

 app.use((req, res, next) => {
     loggerWarn.warn(`Ruta ${req.originalUrl} método ${req.method} no implementado`)
     res.status(404).json({ error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementado` });
     next();
 });





// pongo a escuchar el servidor en el puerto indicado
// definir puerto por linea de comandos
let port = 0
if (process.argv[2] && !isNaN(process.argv[2])) {
    puerto = process.argv[2]
} else if (isNaN(process.argv[2])) {
    console.log('No se ingresó un puerto válido, se usará el 8080');
    loggerTrace.trace('No se ingresó un puerto válido, se usará el 8080')
    puerto = (process.env.PORT || 8080)
}
if (process.argv[3] && isNaN(process.argv[3])) {
  modo = process.argv[3] 
} else if  (isNaN(process.argv[3])){
  loggerTrace.trace('No se ingresó modo valido, se usará el modo fork');
  console.log('No se ingresó modo valido, se usará el modo fork');
  modo = "fork"
}

process.on('unhandledRejection', (reason, promise) => {
 
  loggerWarn.warn(`Unhandled Rejection at:`, reason.stack || reason) 
})




if(modo == "cluster"){
  console.log('modo cluster');

  if (cluster.isMaster) {

  
    loggerTrace.trace('num CPUs', numCPUs);
    loggerTrace.trace(`PID MASTER ${process.pid}`);
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        loggerTrace.trace(`Worker ${worker.process.pid} died`);
        cluster.fork();
})

} else{
  console.log(`Worker PID ${process.pid}`)
  const conexserver = httpServer.listen(puerto, () => {
    console.log(process.argv)
    console.log(`Servidor http escuchando en el puerto ${conexserver.address().port} - PID ${process.pid} - ${ new Date() }`)
  });
  conexserver.on("error", (error) =>  loggerWarn.warn(`Error en servidor ${error}`) );
  }

}
else{ // fork
console.log('modo fork')
const conexserver = httpServer.listen(puerto, function () {
  console.log(`Servidor express en ${conexserver.address().port} - PID ${process.pid} - ${ new Date() }`)
})
conexserver.on("error", (error) => loggerWarn.warn(`Error en servidor ${error}`));
}







