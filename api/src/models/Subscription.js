const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    
    sequelize.define('subscription', {
        alerts: {
            type: DataTypes.ENUM({
                values: ["important", "all"]
            }),
            allowNull: false,
        },
    },{paranoid: false});
};