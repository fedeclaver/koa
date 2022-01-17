

const mensajesDao = require("../daos/mensajes/index.js");
const {loggerWarn,loggerTrace,loggerDefault,loggerError} = require("../utils/log4js");



const crearMensaje = async (req, res) => {
    loggerTrace.trace("Ingreso a crearMensaje");
    try {

        if (req.author.email || req.author.nombre || req.author.apellido || req.author.edad || req.author.alias  || req.author.avatar  || req.text
        ) {
            const newItem = {
                author: {
                    email: req.author.email,
                    nombre: req.author.nombre,                
                    apellido: req.author.apellido,
                    edad: req.author.edad,
                    alias: req.author.alias,
                    avatar: req.author.avatar,
                },
                text: req.text
            };

            // Creamos nuestro respuesta
           let  respuesta = mensajesDao.save(newItem);

            if (respuesta) {
                return respuesta
            } 

        } else {
         
            loggerWarn.warn(
                `El usuario no ingresó un campo de Mensaje requerido .`
              );
                throw new Error(`Error al insertar Mensajes campos requeridos`);
         
        }

    } catch (error) {     
        loggerError.error(error);
        res.status(500).send('Hubo un error');
    }
}

const obtenerMensajes = async (req, res) => {
    loggerTrace.trace("Ingreso a obtenerMensajes");
    try {

        const mensajes = await mensajesDao.getAll();
        if (mensajes && mensajes.length != 0) {

            return mensajes;
         }  

    } catch (error) {
        loggerError.error(error);
        res.status(500).send('Hubo un error');
    }

}


const eliminarMensajes = async (req, res) => {
    loggerTrace.trace("Ingreso a eliminarMensajes");
    try {
        let mensajes = await mensajesDao.deleteAll();

        if (mensajes) {
           return mensajes
        }



    } catch (error) {
        loggerError.error(error);
        res.status(500).send('Hubo un error');
    }
}

module.exports = {eliminarMensajes,obtenerMensajes,crearMensaje};