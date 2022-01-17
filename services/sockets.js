
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
            let id = mensajesController.crearMensaje(mensaje);    
            if (id) {
                io.sockets.emit('mensaje', mensajesController.obtenerMensajes());
                }    
            }) 
       
        socket.on('deleteMensajes', async (data) => {
            let id = await mensajesController.eliminarMensajes();
            if (id) {
            io.sockets.emit('mensaje', id);          
            }
            
        });

    } catch (error) {
        socket.emit('error', { error: error.message })
    }

}