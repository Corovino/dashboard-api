'use strict';

const CompanyModel = require('../models/Company.model'),
    cm = new CompanyModel();


class CompanyController {


    getAll(req, res, next) {
        res.status(200).send("funciono");
    }

    getAll(req, res, next) {

        cm.getAll((docs) => {
            res.status(200).send({ data: docs });
        });
    }

    getOne(req, res, next) {

        let _id = req.params.id;

        cm.getOne(_id, (docs) => {
            res.status(200).send({ data: docs });
        });

    }

    save(req, res, next) {

        let company = {
            _id: (req.body._id || null),
            nombre: req.body.nombre,
            nit: req.body.nit,
            telefono: req.body.telefono,
            ext: req.body.ext,
            email: req.body.email,
            direccion: req.body.direccion,
            logo: req.body.logo,
            encargado: req.body.encargado,
            pais: req.body.pais,
            ciudad: req.body.ciudad,
            estado: req.body.estado
        }

        cm.save(company, (company) => {
            res.status(200).send({ data: company });
        })

    }

    delete() {

    }



}

module.exports = CompanyController;