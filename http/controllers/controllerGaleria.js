var db = require('../relations');
var galeria = db.galeria;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    galeria.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    galeria.findById(id).then(function(galeria) {
        galeria.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    galeria.update(data, {
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
        galeria.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        galeria.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};
