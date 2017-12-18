var db = require('../relations');
var atributo = db.atributo;
var categoria = db.categoria;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    atributo.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.atributoXcategoria = function(req, res, next) {

    var id = req.params.id;

    atributo.findAll({
        where : {
            IdCategoria : id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    atributo.findById(id).then(function(atributo) {
        atributo.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    atributo.update(data, {
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
        atributo.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        atributo.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};
