var _ = require('lodash');
var sequelizePagination = require('sequelize-paginate-cursor');

var db = require('../relations');
var producto = db.producto;
var categoria = db.categoria;
var marca = db.marca;
var color = db.color;

var info = db.info;
var atributo = db.atributo;
var imagen = db.imagen;
var opcion = db.opcion;

var ex = module.exports = {};

ex.create = function(req, res, next) {

    var data = req.body;

    producto.create(data).then(function(result) {
        res.status(200).jsonp(result.id);
    });

};

ex.delete = function(req, res, next) {

    var id = req.params.id;

    producto.findById(id).then(function(producto) {
        producto.destroy().then(function(result) {
            res.status(200).jsonp(result);
        });
    });

};

ex.update = function(req, res, next) {
    var id = req.params.id;
    var data = req.body;

    producto.update(data, {
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
        producto.findById(id).then(function(result) {
            res.status(200).jsonp(result);
        });
    } else {
        producto.findAll().then(function(result) {
            res.status(200).jsonp(result);
        });
    }
};

ex.filtro = function(req, res, next) {

    var data = req.body;

    console.log(data)

    // sequelizePagination(producto, {name: 'paged'});
    //
    // var paged = await Model.paginate({
    //     sinceId: null, // from what value to get documents (default: null)
    //     maxId: null, // to what value to get documents (default: null)
    //     limit: null, //amount of documents to get on search (default: 1)
    //     select: null, //what values get on request
    //     where: null, // query to match the search
    //     include: null, // property to establish relationships
    //     subQuery: null, // set top level options (default: true)
    //     keyPaginated: null, //key to paginate on document (ejm: 'count' ) (default: 'id')
    //     reverse: null, //tell the pagination to reverse the search
    // });
    //
    // console.log(paged.objects)

    if (data.include.length > 0) {

        _.updateWith(data, 'include[0]', _.constant({
            model: opcion,
            as: 'Opcion',
            where: {
                id: data.include[0]
            }
        }), data);

    }

    producto.findAndCountAll(data).then(function(result) {

        let limite = data.limite;
        let pagina = data.pagina;
        let total = result.count;

        let paginas =  _.round(total / limite);    
        var items = _.chunk(result.rows, limite);

        res.status(200).jsonp({paginas : paginas , pagina : pagina, items : items[pagina - 1]})

    });

};

ex.info = function(req, res, next) {

    var id = req.params.id;

    producto.findById(id, {
        include: [
            {
                model: categoria
            }, {
                model: marca
            }, {
                model: color
            }, {
                model: info,
                attributes: [
                    'id', 'contenido'
                ],
                include: [
                    {
                        model: atributo,
                        attributes: ['id', 'nombre']
                    }
                ]
            }
        ]

    }).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.nombres = function(req, res, next) {

    var data = req.body;

    console.log(data);

    producto.findAll(data).then(function(result) {
        res.status(200).jsonp(result);
    });

};

ex.imagen = function(req, res, next) {

    var id = req.params.id;

    imagen.findById(id).then(function(result) {
        res.status(200).jsonp(result);
    });

};

// ex.unavez = function(req, res, next) {
//
//     console.log('vamos!!!!')
//
//     producto.findAll().then(function(productos1) {
//
//         console.log('se desplegaron todos los productos')
//
//         productos1.forEach(p => {
//
//             console.log('vamos por el producto' + p.nombre)
//
//             let valores = { imagen: p.imagen}
//
//             imagen.create(valores).then(function(imagen) {
//
//                 console.log('se crea la imagen del producto' + p.nombre)
//
//                 producto.update({
//                     IdImagen : imagen.id
//                 }, {
//                     where: {
//                         id: p.id
//                     }
//                 }).then(function(algo){
//                     console.log('se edito' + p.nombre)
//                 })
//             });
//         })
//     });
//
// };
