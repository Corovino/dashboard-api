'use strict';

const conn = require('./schema/User'),
       bcrypt = require('bcrypt-nodejs'),    
       JWT   = require('../services/JWT');    

class UserModel {

    getAll(cb) {
        conn.find({}, (err, docs) => {
            if (err) throw err;
            cb(docs);
        });
    }

    getOne(_id, cb) {
        conn.findOne({ _id: _id }, (err, docs) => {
            if (err) throw err;
            cb(docs);
        })
    }
    
    authUser( data, cb ){
        
             conn.findOne({ email: data.email.toLowerCase()},( err, user) => {
             if(err)
             {
                 cb({message:'Error al comprobar'});
             }else{
                 console.log("yser",user);
                 if(user)
                 {
                     bcrypt.compare(data.password,user.contrasena,(err,check)=> {
                         if(check)
                         {
                             if(data.gettoken)
                             {
                                cb({message:user});
                             }else{
                                cb({toekn:JWT.createToken(user)});
                             }
                         }else{
                             cb({message:"credenciales incorrectas"});
                         }
                     });
                 }else{
                     cb({message:"El usuario no existe"});
                 }
             }
    
         });
    }

    getByEmail(email, cb) {

        let findUser = false;
        console.log(`by email ${email}`);
        conn.findOne({ correo: email.toLowerCase() }, (err, respUser) => {

            if (err) {
                cb(err);
                throw err;
            } else {

                if (respUser) {
                    cb(findUser = true);
                } else {
                    cb(findUser = false);
                }
            }
        })

    }

    save(data, cb) {

        console.log("model",data);
        conn.count({ _id: data._id }, (err, count) => {
            if (err) throw err;
            console.log(`Numero de Docs ${count}`);

            if (count === 0) {
                conn.create(data, (err, user) => {
                    if (err) throw err;
                    cb(user);
                })
            } else if (count === 1) {
                conn.findOneAndUpdate({ _id: data._id }, {
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
                }, (err, user) => {
                    if (err) throw err;
                    cb(user);
                });
            }
        })

        console.log("res-data:", data)
        conn.create(data)
            .then(user => cb(user));

    }

    edit(req, res, next) {

    }

    delete(req, res, next) {

    }

}

module.exports = UserModel;