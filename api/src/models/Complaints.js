const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('Complaints', {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
        image: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.ENUM({
                values: ['opened', 'closed']
            }),
            defaultValue: 'opened'
        },
        seen: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        paranoid: true,
    });
};