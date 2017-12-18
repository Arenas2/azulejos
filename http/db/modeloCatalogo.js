var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Catalogo = sequelize.define('catalogo', {
            nombre : Sequelize.STRING,
            archivo: Sequelize.STRING,
            imagen: Sequelize.STRING
        }
    )

    return Catalogo;

};

module.exports = ex;
