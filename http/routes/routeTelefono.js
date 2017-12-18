var express = require('express');
var routeTelefono = express.Router();

var x = require("../controllers/controllerTelefono");

routeTelefono.route('/data/telefono')
        .get(x.read)
        .post(x.create);

routeTelefono.route('/data/telefono/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeTelefono;
