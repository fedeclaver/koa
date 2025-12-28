const Koa = require("koa");
const json = require('koa-json');
const cors = require("koa-cors");
const session = require('koa-session');
const koaBody = require("koa-body");
const KoaStatic = require('koa-static');
const passport = require('koa-passport');

const config = require("./config/config.js");
const { loggerError } = require('./utils/log4js.js');
const errorHandler = require('./middleware/errorHandler');
const router = require('./routes');

const app = new Koa();

// Error handling - debe ir primero para capturar todos los errores
app.use(errorHandler);

// Static files
app.use(KoaStatic(__dirname + '/public'));

// Body parsing
app.use(koaBody());
app.use(json());

// CORS
if (config.ALLOW_CORS) {
    app.use(cors());
}

// Session & Auth
app.use(session(config.SESSION_CONFIG, app));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

// Application error event handler
app.on('error', (err, ctx) => {
    loggerError.error('Unhandled application error', {
        error: err.message,
        url: ctx?.url,
        method: ctx?.method
    });
});

// Server listen
const PORT = config.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor Koa escuchando en el puerto ${PORT}`);
});

server.on('error', error => {
    loggerError.error('Error en Servidor Koa:', error);
});




