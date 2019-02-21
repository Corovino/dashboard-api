'use strict';

const app = require('./app'),
    server = app.listen(app.get('port'), () => console.log(`Api rest petfud dashboard start in port ${app.get('port')}`));