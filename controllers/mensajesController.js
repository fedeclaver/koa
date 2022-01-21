

const MensajesRepo = require("../repositorios/MensajesRepo.js");
const { loggerWarn,loggerTrace,loggerDefault,loggerError } = require("../utils/log4js");
const { asViewModels, asModel }  = require("../mappers/mensajesMapper.js");
const  { generarId } = require("../utils/identificadores.js");
const { normalizarMensajes } = require("../utils/normalizacion/index.js");

const mensajesRepo = new MensajesRepo()
class MensajesApi {
    #mensajesRepo

    constructor() {
        this.#mensajesRepo = mensajesRepo
    }

    async save(datos) {
        datos.id = generarId('mensaje')
        const mensaje = asModel(datos)
        return await this.#mensajesRepo.save(mensaje)
    }

    async getAll() {
        const mensajes = await this.#mensajesRepo.getAll()
        const vms = asViewModels(mensajes)
       // const msgsNormalizado = normalizarMensajes(vms)
        return vms
    }
    async eliminarMensajes() {
        const mensajes = await this.#mensajesRepo.deleteAll()
        const vms = asViewModels(mensajes)
       // const msgsNormalizado = normalizarMensajes(vms)
        return vms
    }
}



const mensajesApi = new MensajesApi()


module.exports = mensajesApi;