var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Producto = sequelize.define('producto', {
        nombre:  Sequelize.STRING
    })
    return Producto;
};

module.exports = ex;
