


let carritosDao

require('dotenv').config({ path: 'variables.env' });

switch (process.env.BASE) {
    case 'mongodb':
        const  CarritosDaoMongo=  require('./CarritosDaoMongo.js');

        carritosDao = new CarritosDaoMongo()
     
 
}


module.exports = carritosDao;