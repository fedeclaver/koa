const Mensaje = require("../modelos/Mensaje.js");
const Autor = require("../modelos/Autor.js");

const asViewModel = (mensaje) => {
//module.exports = function asViewModel(mensaje) {
    const viewModel = {
        id: mensaje.id,
        author: {
            email: mensaje.author.email,
            nombre: mensaje.author.nombre,
            apellido: mensaje.author.apellido,
            edad: mensaje.author.edad,
            alias: mensaje.author.alias,
            avatar: mensaje.author.avatar
        },
        text: mensaje.text,
        fyh: mensaje.fyh
    }
    return viewModel
}
const asViewModels = (models) => {
//module.exports = function asViewModels(models) {
    const viewModels = models.map(asViewModel)
    return viewModels
}
const asModel = (datos) => {
//module.exports = function asModel(datos) {
    const author = new Autor(datos.author)
    const mensaje = new Mensaje({ ...datos, author })
    return mensaje
}
const asModels = (datos) => {
//module.exports = function asModels(datos) {
    const mensajes = datos.map(d => asModel(d))
    return mensajes
}

const asDto = (mensaje) => {
//module.exports = function asDto(mensaje) {
    const dto = {
        id: mensaje.id,
        author: {
            email: mensaje.author.email,
            nombre: mensaje.author.nombre,
            apellido: mensaje.author.apellido,
            edad: mensaje.author.edad,
            alias: mensaje.author.alias,
            avatar: mensaje.author.avatar
        },
        text: mensaje.text,
        fyh: mensaje.fyh
    }
    return dto
}

const asDtos = (mensajes) => {
//module.exports = function asDtos(mensajes) {
    const dtos = mensajes.map(d => asDto(d))
    return dtos
}


module.exports = {
    asDtos,asDto,asModel,asModels,asViewModel,asViewModels

  };
  