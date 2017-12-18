var express = require('express');
var routeCategoria = express.Router();

var x = require("../controllers/controllerCategoria");

routeCategoria.route('/data/categoria')
        .get(x.read)
        .post(x.create);

routeCategoria.route('/data/categoria/:id')
        .get(x.one)
        .put(x.update)
        .delete(x.delete);

routeCategoria.route('/data/opciones/contar/:id')
        .get(x.contar);

module.exports = routeCategoria;
