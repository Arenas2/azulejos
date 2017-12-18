var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Categoria = sequelize.define('categoria', {
        nombre : Sequelize.STRING,
		imagen : Sequelize.STRING,
        color : Sequelize.STRING
    })

    return Categoria;

};

module.exports = ex;
