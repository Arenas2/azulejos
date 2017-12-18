var db = require('../relations');
var telefono = db.telefono;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    telefono.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    telefono.findById(id).then(function(telefono) {
        telefono.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    telefono.update(data, {
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
        telefono.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        telefono.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};
