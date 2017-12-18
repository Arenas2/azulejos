var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Cotizacion = sequelize.define('cotizaciones', {
        nombre : Sequelize.STRING,
        telefono: Sequelize.STRING,
        correo: Sequelize.STRING,
        direccion: Sequelize.STRING,
        ciudad: Sequelize.STRING
    })

    return Cotizacion;

};

module.exports = ex;
