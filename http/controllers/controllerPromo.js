var db = require('../relations');
var promo = db.promo;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    promo.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    promo.findById(id).then(function(promo) {
        promo.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    promo.update(data, {
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
        promo.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        promo.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};

ex.activas = function(req, res, next) {


    promo.findAll({
        where: {
            status : 1
        },
        order: [
            'createdAt'
        ]
    }).then(function(result) {
        res.status(200).jsonp(result);
    });
};
