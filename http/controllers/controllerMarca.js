var db = require('../relations');
var marca = db.marca;
var catalogo = db.catalogo;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    marca.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    marca.findById(id).then(function(marca) {
        marca.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    marca.update(data, {
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
        marca.findById(id, {include : [
            {
                model : catalogo
            }

        ]}).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        marca.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};



ex.catalogos = function(req, res, next) {

    marca.findAll(
        { include : [
            {
                model : catalogo
            }
        ]
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};
