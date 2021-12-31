const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    nombre:{
        type: String,
        required: true
    },
    direccion:{
        type: String,
        required: true
    },
    edad:{
        type: String,
        required: true
    },
    telefono:{
        type: String,
        required: true
    },
    foto:{
        type: String,
        required: true
    },

    date_registered:{
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);

