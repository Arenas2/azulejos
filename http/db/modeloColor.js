var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Color = sequelize.define('color', {
        nombre : Sequelize.STRING
    })

    return Color;

};

module.exports = ex;
