var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Opcion = sequelize.define('opciones', {
        nombre:  Sequelize.STRING
    })
    return Opcion;
};

module.exports = ex;
