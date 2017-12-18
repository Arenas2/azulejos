var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Marca = sequelize.define('marca', {
        nombre: Sequelize.STRING
    })

    return Marca;

};

module.exports = ex;
