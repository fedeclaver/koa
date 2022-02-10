const mensajesController = require("../controllers/mensajesController");
// logger
const { loggerTrace, loggerInfo, loggerWarn, loggerError } = require('../utils/log4js');
const IO = require("koa-socket-2");

const bindWebSocket = (app) => {
  io.attach(app);
  const io = new IO({
    ioOptions: {
      pingInterval: 5000,
      pingTimeout: 10000,
      ...(!0 && { cors: {} }),
    },
  });
  io.on("connection", (socket, data) => {
    console.log("new client connected");
  });

  io.on("message", (ctx, data) => {
    try {
      (async () => {
        let resultado = await mensajesController.getAll();
        socket.emit("mensaje", resultado);
      })();
      socket.on("nuevoMensaje", (mensaje) => {
        mensaje.fyh = new Date().toLocaleString();
        let id = mensajesController.save(mensaje);
        if (id) {
          io.sockets.emit("mensaje", mensajesController.getAll());
        }
      });

      socket.on("deleteMensajes", async (data) => {
        let id = await mensajesController.eliminarMensajes();
        if (id) {
          io.sockets.emit("mensaje", id);
        }
      });
    } catch (error) {
      socket.emit("error", { error: error.message });
    }
  });
  io.on("disconnect", (ctx, data) => {
    // event triggered when the client disconnects
  });
};

module.exports = {
  bindWebSocket,
};
