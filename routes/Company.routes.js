'use strict';

const CompanyController = require('../controllers/Company.controller'),
    express = require('express'),
    router = express.Router(),
    ec = new CompanyController();

router
    .get('/company', ec.getAll)
    .get('/company/:id', ec.getOne)
    .post('/company', ec.save);

module.exports = router;