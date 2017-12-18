var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Info = sequelize.define('info', {
        contenido : Sequelize.STRING
    })

    return Info;

};

module.exports = ex;
