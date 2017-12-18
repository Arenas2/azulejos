var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Telefono = sequelize.define('telefono', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        telefono: Sequelize.STRING
    })

    return Telefono;
};

module.exports = ex;
