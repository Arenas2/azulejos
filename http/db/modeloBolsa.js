var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Bolsa = sequelize.define('bolsa', {
        cantidad : Sequelize.STRING
    })

    return Bolsa;

};

module.exports = ex;
