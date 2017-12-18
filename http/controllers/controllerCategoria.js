var db = require('../relations');
var categoria = db.categoria;
var atributo = db.atributo;
var opcion = db.opcion;
var producto = db.producto;

var conector = require('../connection');
var sequelize = conector.sequelize;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    categoria.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    categoria.findById(id).then(function(categoria) {
        categoria.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    categoria.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};

ex.read = function(req, res, next) {

    var id = req.params.id;

    categoria.findAll().then(function(result) {
        res.status(200).jsonp(result);
    });


};


ex.one = function(req, res, next) {

    var id = req.params.id;

    categoria.findById(id, {
        include : [{
            model: atributo,
            include : [
                {
					model : opcion,
                    include : [
                        {
                            model : producto,
                            as : 'Producto',

                        }
                    ]
				}
            ]
        }]
    }).then(function(result) {
        res.status(200).jsonp(result);
    });

};


ex.contar = function(req, res, next) {

    var id = req.params.id;

    opcion.findById(id, {
        include : [
            {
                model : producto,
                as : 'Producto',
                attributes: [ 'id'],

            }
        ]
    }).then(result => {

        console.log(result)

        var data =  result !== null ? result.Producto.length : 0
        res.status(200).jsonp(data)
    });

};
