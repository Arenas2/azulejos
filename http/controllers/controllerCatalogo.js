var db = require('../relations');
var catalogo = db.catalogo;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    catalogo.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    catalogo.findById(id).then(function(catalogo) {
        catalogo.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    catalogo.update(data, {
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
        catalogo.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        catalogo.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};
