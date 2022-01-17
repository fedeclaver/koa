
const mensajesController = require('../controllers/mensajesController');
// logger
const { loggerTrace, loggerInfo, loggerWarn, loggerError } = require('../utils/log4js');


module.exports = (io, socket) => {
    

    try {
        (async () => {
           let resultado = await mensajesController.obtenerMensajes()
            socket.emit('mensaje',resultado );
        })();
        socket.on('nuevoMensaje', (mensaje) => {
            mensaje.fyh = new Date().toLocaleString()
            const id = mensajesController.crearMensaje(mensaje);    
            if (id) {
                io.sockets.emit('mensaje', mensajesController.obtenerMensajes());
                }    
            }) 
       
        socket.on('deleteMensaje', async (data) => {
            await mensaje.eliminarMensajes();
            io.sockets.emit('mensaje', await mensajesController.obtenerMensajes());
            loggerInfo.info(`ws: ${data}`);
        });

    } catch (error) {
        socket.emit('error', { error: error.message })
    }

}