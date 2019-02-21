'use strict';

const mongoose = require('../../config/connect'),
    Schema = mongoose.Schema,
    CompanySchema = new Schema({
        _id: Schema.Types.ObjectId,
        nombre: String,
        nit: String,
        telefono: String,
        ext: String,
        email: String,
        direccion: String,
        pais: String,
        ciudad: String,
        logo: String,
        encargado: String,
        estado: Boolean
    }, {
        collection: 'company'
    }),
    Company = mongoose.model('Empresa', CompanySchema);

module.exports = Company;