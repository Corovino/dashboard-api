'use strict';

const mongoose = require('../../config/connect'),
    Schema = mongoose.Schema,
    UserSchema = new Schema({
        _id: Schema.Types.ObjectId,
        nombre: String,
        apellido: String,
        email: String,
        foto: String,
        contrasena: String,
        role: String,
        pais: String,
        ciudad: String,
        empresa: String,
        estado: Boolean
    }, {
        collection: 'user'
    }),
    User = mongoose.model('User', UserSchema);

module.exports = User;