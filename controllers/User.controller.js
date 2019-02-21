'use strict';

const Usermodel = require('../models/User.model'),
    bcrypt = require('bcrypt-nodejs'),
    um = new Usermodel();

class UserController {


    getAll(req, res, next) {
        um.getAll((docs) => {
            res.status(200).send({ data: docs });
        });
    }

    login(req, res, next) {
        let params = req.body;
        let email = params.email;
        let password = params.password;
        console.log(params);
        um.authUser(params, (user)=> {
            res.status(200).send(user);
        })
        
        

    }

    getOne(req, res, next) {
        res.status(200).send({ message: 'funciono' });
    }

    save(req, res, next) {

        let user = {
            _id: (req.body._id || null),
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            foto: req.body.foto,
            role: req.body.role,
            pais: req.body.pais,
            ciudad: req.body.ciudad,
            empresa: req.body.empresa,
            estado: req.body.estado
        };

        console.log('one', user);

        if (user.email && req.body.contrasena) {

            um.getByEmail(user.email, (response) => {
                console.log(response);        
                if (response) {
                    res.status(200).send({ data: "El usuario ya se encuentra registrado" });
                } else {

                    bcrypt.hash(req.body.contrasena, null, null, (err, hash) => {
                        console.log(`pass bcryp ${hash}`);
                        user.contrasena = hash;
                        console.log('contrasena', user);
                        um.save(user, (user) => {
                            res.status(200).send({ data: user });
                        });
                    });
                }
            });
        }
    }



    deleteUser() {

    }


}


module.exports = UserController;