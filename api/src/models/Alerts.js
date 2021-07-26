const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    
    sequelize.define('Alerts', {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        concept: {
            type: DataTypes.STRING,
            allowNull: false
        },
        details: {
            type: DataTypes.STRING(16384),
        },
        importance: {
            type: DataTypes.ENUM({
                values: ["alta", "media", "baja"]
            }),
            allowNull: false,
        },
    },{paranoid: true});
};