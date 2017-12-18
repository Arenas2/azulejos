var express = require('express');
var routeAtributo = express.Router();

var x = require("../controllers/controllerAtributo");

routeAtributo.route('/data/atributo')
        .get(x.read)
        .post(x.create);

routeAtributo.route('/data/atributoXcategoria/:id')
        .get(x.atributoXcategoria);

routeAtributo.route('/data/atributo/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeAtributo;
