var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Atributo = sequelize.define('atributo', {
        nombre : Sequelize.STRING
    })

    return Atributo;

};

module.exports = ex;
