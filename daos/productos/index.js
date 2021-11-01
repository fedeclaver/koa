


let productosDao

require('dotenv').config({ path: 'variables.env' });

switch (process.env.BASE) {
    case 'mongodb':
        const  ProductosDaoMongo=  require('./ProductosDaoMongo.js');

        productosDao = new ProductosDaoMongo()
     
 
}


module.exports = productosDao;