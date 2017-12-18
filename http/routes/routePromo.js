var express = require('express');
var routePromo = express.Router();

var x = require("../controllers/controllerPromo");

routePromo.route('/data/promo')
        .get(x.read)
        .post(x.create);

routePromo.route('/data/promo/activas')
        .get(x.activas);

routePromo.route('/data/promo/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routePromo;
