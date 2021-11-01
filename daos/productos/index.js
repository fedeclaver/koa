


let productosDao

require('dotenv').config({ path: 'variables.env' });

switch (process.env.BASE) {
    case 'mongodb':
        const  ProductosDaoMongo=  require('./ProductosDaoMongo.js');
        productosDao = new ProductosDaoMongo()
        break;
        case 'firebase':
            const  ProductosDaoFirebase=  require('./ProductosDaoFirebase.js');
            productosDao = new ProductosDaoFirebase()
            break;
    }    
 



module.exports = productosDao;