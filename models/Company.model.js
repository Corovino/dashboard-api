'use strict';


const conn = require('./schema/Company');

class CompanyModel {

    getAll(cb) {

        conn.find({}, (err, docs) => {
            if (err) throw err;
            cb(docs);
        })

    }

    getOne(_id, cb) {
        conn.findOne({ _id: _id }, (err, docs) => {
            if (err) throw err;
            cb(docs);
        })
    }

    save(data, cb) {

        conn.count({ _id: data._id }, (err, count) => {
            if (err) throw err;
            console.log(`Numero de Docs ${count}`);

            if (count === 0) {
                conn.create(data, (err, empresa) => {
                    if (err) throw err;
                    cb(empresa);
                })
            } else if (count === 1) {
                conn.findOneAndUpdate({ _id: data._id }, {
                    nombre: data.nombre,
                    nit: data.nit,
                    telefono: data.telefono,
                    ext: data.ext,
                    email: data.email,
                    direccion: data.direccion,
                    logo: data.logo,
                    encargado: data.encargado,
                    pais: data.pais,
                    ciudad: data.ciudad,
                    estado: data.estado
                }, (err) => {
                    if (err) throw err;
                    cb();
                });
            }
        })

    }

    edit(req, res, next) {

    }

    delete(req, res, next) {

    }

}


module.exports = CompanyModel;