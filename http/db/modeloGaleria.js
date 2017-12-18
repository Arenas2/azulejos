var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Galeria = sequelize.define('galeria', {
        nombre : Sequelize.STRING,
        imagen: {
            type: Sequelize.BLOB('medium'),
            get() {
                var imagenBin = this.getDataValue('imagen');
                var Imagenes = new Buffer(imagenBin).toString('ascii');
                return Imagenes
            },
        }
    })

    return Galeria;

};

module.exports = ex;
