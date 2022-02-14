const mongoose = require('mongoose');

const Conexion = require('../config/config.js');

mongoose.connect(Conexion.mongodb.cnxStr, Conexion.mongodb.options);
const parse_obj = obj => JSON.parse(JSON.stringify(obj))

class ContenedorMongo {

    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async guardar(objeto) {
        try {
            const cantidad = await this.coleccion.find({}).count()
            if (cantidad == 0) {
                objeto.id = 1;
            } else {
                let max = await this.coleccion.find().sort({ id: -1 }).limit(1) //max id

                max = JSON.parse(max[0].id);
                objeto.id = max + 1;
            }
            let doc = await this.coleccion.create(objeto);
            doc = parse_obj(doc)
            return doc
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }


    async save(object) {
        //Recibe un objeto, lo inserta en la tabla.
        let id
        let resp
        const cantidad = await this.coleccion.find({}).count()
        if (cantidad == 0){
            id = 1
        }
        else{
            resp = await this.coleccion.find({},{_id:0,id:1}).sort({id:-1}).limit(1) //obtiene el maximo id
            id = resp[0].id + 1 //determina el proximo id
        }
        object.id = id //inserta id en el objeto
        const usuarioSaveModel = new this.coleccion(object)
        await usuarioSaveModel.save()
        return id
    }
    

    //buscar todos los registros.
    async getAll() {
        let doc = await this.coleccion.find({})        
        //doc = parse_obj(doc)
        return doc
    }
    //buscar un id 
    async getById(id) {
        return await this.coleccion.findOne({ id: id }, { _id: 0, __v: 0 })
    }
     //buscar 
     async getByName(usuario) {
        let doc = await this.coleccion.findOne({ 'usuario': usuario })
        doc = parse_obj(doc)
        return doc
    }
    //borrar un id 
    async deleteById(id) {
        //console.log(id)
        return await this.coleccion.deleteOne({ id: id })
    }
    //borrar todo 
    async deleteAll() {
        return await this.coleccion.deleteMany({})
    }
    //Actualizar según id.
    async update(object) {
        const id = object.id
        return await this.coleccion.replaceOne({ id: id }, object)
    }
    //cerrar conexion
    async close() {
        mongoose.connection.close()
    }
}

module.exports = ContenedorMongo;