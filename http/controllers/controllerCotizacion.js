var db = require('../relations');
var cotizacion = db.cotizacion;
var bolsa = db.bolsa;
var producto = db.producto;
var imagen = db.imagen;

var marca = db.marca;
var categoria = db.categoria;
var sucursal = db.sucursal;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    cotizacion.create(data).then(function(result) {
        data.bolsa.forEach(producto => {
            bolsa.create({id_producto: producto.id, id_cotizacion : result.id})
        })
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    cotizacion.findById(id).then(function(cotizacion) {
        cotizacion.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    cotizacion.update(data, {
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
        cotizacion.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        cotizacion.findAll({
            include : [
                { model : sucursal }
            ]
        }).then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};

ex.bolsaXcotizacion = function(req, res, next) {

    var id = req.params.id;

    bolsa.findAll({
        where: {
            id_cotizacion : id
        },
        include: [
            {
                model: producto,
                include: [
                    {model : marca},
                    {model: categoria},
                    {model: imagen}
                ]
            }
        ]
    }).then(function(result) {

        res.status(200).jsonp(result);

    });

};
