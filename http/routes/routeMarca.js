var express = require('express');
var routeMarca = express.Router();

var x = require("../controllers/controllerMarca");

routeMarca.route('/data/marca')
        .get(x.read)
        .post(x.create);


routeMarca.route('/data/marca/catalogos')
        .get(x.catalogos);

routeMarca.route('/data/marca/:id')
        .get(x.read)
        .put(x.update)
        .delete(x.delete);

module.exports = routeMarca;
