
const knex = require('knex');

class ContenedorDatabase {
    constructor(config,tabla) {
        this.tabla = tabla
        this.knex = knex(config)
    }

    guardar(object) {    
        return this.knex(this.tabla).insert(object)
    }
    
    listarAll(){        
        return this.knex(this.tabla).select('*')
    }

    getById(id){        
        return this.knex(this.tabla).where('id', id).select('*')
    }
    
    deleteById(id) {    
        return this.knex.from(this.tabla).where('id', id).del()
    }

    deleteAll(){
        return this.knex.from(this.tabla).del()
    }
    
    update(object) {    
        const id = object.id 
        delete object['id']; 
        return this.knex.from(this.tabla).where('id', id).update(object) 
    }

    close() {
        this.knex.destroy();
    }
}



module.exports = ContenedorDatabase


