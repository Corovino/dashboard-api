'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    user_routes = require('./routes/User.routes'),
    //rol_routes = require('./routes/Rol.routes'),
    company_routes = require('./routes/Company.routes'),
    port = (process.env.PORT || 3000);

let app = express();

app
    .set('port', port)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(morgan('dev'))
    .use((req, res, next) => {
        res.header('Acces-Cntrol-Allow-Origin', '*');
        res.header('Acces-Cntrol-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-Whit, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Method', 'GET,POST,OPTIONS,PUT,DELETE');
        res.header('Allow', 'GET,POST,OPTIONS,PUT,DELETE');
        next();
    })
    .use('/v1', user_routes)
    //.use('/v1', rol_routes)
    .use('/v1', company_routes);

module.exports = app;