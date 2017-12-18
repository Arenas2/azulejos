var express = require('express');
var routeSucursal = express.Router();

var x = require("../controllers/controllerSucursal");

routeSucursal.route('/data/sucursal')
        .get(x.read)
        .post(x.create);

routeSucursal.route('/data/sucursal/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

routeSucursal.route('/data/sucursal/unir/:idSucursal/:idUsuario')
        .post(x.unir);

module.exports = routeSucursal;
