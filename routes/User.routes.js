'use strict';

const UserController = require('../controllers/User.controller'),
    express = require('express'),
    router = express.Router(),
    md_auth = require('../middlewares/Authenticate'),
    uc = new UserController();

router
    .post('/register', uc.save)
    .get('/user', md_auth.ensureAuth, uc.getAll)
    .post('/login', uc.login);

module.exports = router;