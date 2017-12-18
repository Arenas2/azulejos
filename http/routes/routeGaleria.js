var express = require('express');
var routeGaleria = express.Router();

var x = require("../controllers/controllerGaleria");

routeGaleria.route('/data/galeria')
        .get(x.read)
        .post(x.create);

routeGaleria.route('/data/galeria/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeGaleria;
