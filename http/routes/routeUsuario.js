var express = require('express');
var routeUsuario = express.Router();

var x = require("../controllers/controllerUsuario");

routeUsuario.route('/data/usuario')
        .get(x.read)
        .post(x.create);

routeUsuario.route('/data/registro')
        .post(x.registro);

routeUsuario.route('/data/login')
        .post(x.login);

routeUsuario.route('/data/token')
        .post(x.token);

routeUsuario.route('/data/usuario/:id')
        .get(x.read)
        .put(x.update);

module.exports = routeUsuario;
