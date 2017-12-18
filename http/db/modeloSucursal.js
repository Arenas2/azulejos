var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Sucursal = sequelize.define('sucursal', {
        id:{ type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
        nombre: Sequelize.STRING,
        latitude: Sequelize.FLOAT,
        longitude:Sequelize.FLOAT,
        numero: Sequelize.STRING,
        calle: Sequelize.STRING,
        colonia: Sequelize.STRING,
        estado: Sequelize.STRING,
        codigopostal: Sequelize.STRING,
        inicio: Sequelize.DATE,
        fin: Sequelize.DATE,
        apertura: Sequelize.STRING,
        cierre: Sequelize.STRING

    })

    return Sucursal;
};

module.exports = ex;
