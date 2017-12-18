var express = require('express');
var routeCotizacion = express.Router();

var x = require("../controllers/controllerCotizacion");

routeCotizacion.route('/data/cotizacion')
        .get(x.read)
        .post(x.create);

routeCotizacion.route('/data/cotizacion/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);


routeCotizacion.route('/data/bolsaXcotizacion/:id')
        .get(x.bolsaXcotizacion);

module.exports = routeCotizacion;
