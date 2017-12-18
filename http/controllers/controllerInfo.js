var _ = require('lodash');

var db = require('../relations');
var info = db.info;
var atributo = db.atributo;
var opcion = db.opcion;
var producto = db.producto;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;
    console.log(data);

    info.create(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.test = function(req, res, next) {

    console.log('si estoy funcionando')

    info.findAll().then(infos => {

        // var array = _.map(opciones, 'contenido')
        // //
        // var array2 = _.uniq(array)
        // //
        // var array3 = []
        // //
        // _.forEach(array2, function(value) {
        //
        //     var obj = _.find(opciones, function(o) { return o.contenido === value; });
        //
        //     array3.push({ contenido : value,  IdAtributo: obj.IdAtributo })
        //
        //     opcion.create({ nombre : value,  IdAtributo: obj.IdAtributo })
        //
        // })
        //
        // res.status(200).jsonp(array3);

        _.forEach(infos, function(obj) {

            let id = obj.IdProducto;

            producto.findById(id).then( x => {

                console.log(x.id)

                opcion.findOne({
                    where : {
                        nombre : obj.contenido
                    }
                }).then(z => {
                    x.addOpcion(z.id)
                })

            })

            // var obj = _.find(opciones, function(o) { return o.contenido === value; });
            //
            // array3.push({ contenido : value,  IdAtributo: obj.IdAtributo })
            //
            // opcion.create({ nombre : value,  IdAtributo: obj.IdAtributo })

        })

    });

};

ex.infoXproducto = function(req, res, next) {

    var id = req.params.id;

    info.findAll({
        where:{
            idProducto: id
        },
        include: [
            {
                model: atributo,
                attributes:
    					['id', 'nombre']
            }
        ],
        attributes: ['id', 'contenido']
    }).then(function(result) {
        res.status(200).jsonp(result);
    });

};



ex.delete = function(req, res, next) {

    var id = req.params.id;

    info.findById(id).then(function(info) {
        info.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    info.update(data, {
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
        info.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        info.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};
