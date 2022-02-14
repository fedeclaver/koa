//config
const {mongodb,SESSION_CONFIG, ENABLE_WEB_SOCKETS,ALLOW_CORS} = require("./config/config.js");
//logger
const { loggerTrace,loggerInfo, loggerWarn, loggerError } = require('./utils/log4js.js');

const Koa = require("koa");
const json = require('koa-json');

const app = new Koa();

const cors = require("koa-cors");

const session = require('koa-session');


const koaBody = require("koa-body");

const KoaStatic = require('koa-static')
app.use(KoaStatic(__dirname + '/public'))
app.use(json());

app.use(koaBody());


ALLOW_CORS && app.use(cors());


//passport
const passport = require('koa-passport');
app.use(passport.initialize());
app.use(session(SESSION_CONFIG, app));
app.use(passport.session());

const router = require('./routes');


app.use(router.routes());
app.use(router.allowedMethods());

//app.use(productosRouter.routes());

ENABLE_WEB_SOCKETS && bindWebSocket(app);

// Server listen
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor Koa escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log('Error en Servidor Koa:',error))




