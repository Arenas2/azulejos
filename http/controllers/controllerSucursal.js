var db = require('../relations');
var sucursal = db.sucursal;
var usuario = db.usuario;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    sucursal.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    sucursal.findById(id).then(function(sucursal) {
        sucursal.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    sucursal.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        sucursal.findById(id, {
            include : [
                {
                    model : usuario,
                    as: 'Usuario'
                }
            ]
        }).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        sucursal.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};

ex.unir = function(req, res, next) {

    var idUsuario = req.params.idUsuario;
    var idSucursal = req.params.idSucursal;

    sucursal.findById(idSucursal).then(result => {

        result.addUsuario(idUsuario).then(x => {
			res.status(200).jsonp(x);
		})

    })


};
