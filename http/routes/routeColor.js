var express = require('express');
var routeColor = express.Router();

var x = require("../controllers/controllerColor");

routeColor.route('/data/color')
        .get(x.read)
        .post(x.create);

routeColor.route('/data/color/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeColor;
