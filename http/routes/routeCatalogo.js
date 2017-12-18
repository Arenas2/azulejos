var express = require('express');
var routeCatalogo = express.Router();

var x = require("../controllers/controllerCatalogo");

routeCatalogo.route('/data/catalogo')
        .get(x.read)
        .post(x.create);

routeCatalogo.route('/data/catalogo/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeCatalogo;
